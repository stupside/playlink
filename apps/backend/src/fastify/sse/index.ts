import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { OutgoingHttpHeaders } from "http2";

export const SESSION_CHANNEL = (session: { id: number }) =>
  `session:${session.id}`;

export type SessionEvent<TData extends unknown = never> = {
  type: string;
  data: TData;
};

export const dispatch = <
  TEvent extends unknown,
  TSessionEvent extends SessionEvent<TEvent>,
>(
  fastify: FastifyInstance,
  session: number,
  event: TSessionEvent,
) => {
  return fastify.redis.eproducer?.publish(
    SESSION_CHANNEL({ id: session }),
    JSON.stringify(event),
  );
};

export const subscribe = async (
  fastify: FastifyInstance,
  session: number,
  handle: (event: SessionEvent) => Promise<void>,
) => {
  const it = SESSION_CHANNEL({ id: session });

  await fastify.redis.econsumer?.subscribe(it);

  const onMessage = async (channel: string, message: string) => {
    if (channel === it) {
      await handle(JSON.parse(message) as SessionEvent);
    }
  };

  fastify.redis.econsumer?.on("message", onMessage);

  return async () => {
    fastify.redis.econsumer?.off("message", onMessage);

    await fastify.redis.econsumer?.unsubscribe(it);
  };
};

export const sse = async (
  fastify: FastifyInstance,
  request: FastifyRequest,
  response: FastifyReply,
  session: number,
) => {
  const headers: OutgoingHttpHeaders = {
    connection: "keep-alive",
    "cache-control": "no-cache",
    "content-type": "text/event-stream",
    "access-control-allow-origin": fastify.config.PLAYLINK_FRONTEND_CSR_URL,
  };

  response.raw.writeHead(200, headers);

  const unsubscribe = await subscribe(
    fastify,
    session,
    async ({ type, data }) => {
      response.raw.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
    },
  );

  request.raw.on("close", unsubscribe);
};
