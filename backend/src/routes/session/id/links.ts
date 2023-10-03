
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../../utils/prisma";

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
            tags: [
                "session"
            ],
            description: "Listen for links.",
            params: Params,
        }
    }, async (request, response) => {

        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: request.params.session
            }
        });

        const headers = {
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
            "Content-Type": "text/event-stream",
        };

        response.raw.writeHead(200, headers);

        const links = `session.${session.id}.links`;

        await fastify.redis.subscriber.subscribe(links);

        fastify.redis.subscriber.on("message", async (channel, message) => {

            if (channel === links) {

                const link = await prisma.link.findUniqueOrThrow({
                    where: {
                        id: Number(message)
                    }
                });

                const type = "message";

                const data = { type: link.type, url: link.url };

                const event = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

                response.raw.write(event);
            }
        });

        response.raw.on("close", () => {

            fastify.redis.subscriber.unsubscribe(links);
        });

    });
};

export default route;