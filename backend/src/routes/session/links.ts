
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../utils/prisma";

export const Params = Type.Object({
    session: Type.Number()
});

type ParamsType = Static<typeof Params>;

interface Links extends RequestGenericInterface {
    Params: ParamsType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Links>("/session/:session/links", {
        schema: {
            params: Params
        }
    }, async (request, response) => {

        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: request.params.session
            }
        });

        if (session) {

            const headers = {

                "Connection": "keep-alive",
                "Cache-Control": "no-cache",
                "Content-Type": "text/event-stream",

                "Access-Control-Allow-Origin": fastify.config.FRONTEND_URL
            };

            response.raw.writeHead(200, headers);

            await fastify.redis.subscriber.psubscribe("session:*:links");

            fastify.redis.sub.on("message", async (channel, message) => {

                if (channel === `session:${session.id}:links`) {

                    const link = await prisma.link.findUniqueOrThrow({
                        where: {
                            id: Number(message)
                        }
                    });

                    if (link) {

                        const type = "message";

                        const data = { type: link.type, url: link.url };

                        const event = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

                        response.raw.write(event);
                    }
                }
            });
        }
        else {

            response.code(404).send("Session not found");
        }
    });
};

export default route;