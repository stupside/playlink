import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const SESSION_CHANNEL = (session: { id: number }) =>
  `session.${session.id}`;

export type SessionEvent<TData extends unknown = never> = {
  type: string;
  data: TData;
};

export const dispatch = <
  TEvent extends unknown,
  TSessionEvent extends SessionEvent<TEvent>
>(
  fastify: FastifyInstance,
  session: number,
  event: TSessionEvent
) => {
  fastify.log.debug(event.type, "Publishing event to redis");

  return fastify.redis.publisher.publish(
    SESSION_CHANNEL({ id: session }),
    JSON.stringify(event)
  );
};

export const subscribe = async (
  fastify: FastifyInstance,
  session: number,
  handle: (event: SessionEvent) => Promise<void>
) => {
  const it = SESSION_CHANNEL({ id: session });

  await fastify.redis.subscriber.subscribe(it);

  const onMessage = async (channel: string, message: string) => {
    if (channel === it) {
      handle(JSON.parse(message) as SessionEvent);
    }
  };

  fastify.log.info(it, "Subscribing to redis events");

  fastify.redis.subscriber.on("message", onMessage);

  return async () => {
    fastify.log.info(it, "Unsubscribing to redis events");

    fastify.redis.subscriber.off("message", onMessage);

    await fastify.redis.subscriber.unsubscribe(it);
  };
};

export const sse = async (
  fastify: FastifyInstance,
  request: FastifyRequest,
  response: FastifyReply,
  session: number
) => {
  const headers = {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",

    "Access-Control-Allow-Origin": fastify.config.PLAYLINK_FRONTEND_SSR_URL,
  };

  response.raw.writeHead(200, headers);

  const unsubscribe = await subscribe(
    fastify,
    session,
    async ({ type, data }) => {
      const event = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

      response.raw.write(event);
    }
  );

  request.raw.on("close", unsubscribe);
};
