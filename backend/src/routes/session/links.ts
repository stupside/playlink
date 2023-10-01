
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { JsonTypeBuilder, Static, Type } from '@sinclair/typebox'

import prisma from "../../utils/prisma";

type Handler = (params: { type: string, url: string }) => Promise<void>;

// TODO: https://github.com/fastify/fastify-awilix
export const clients = new Map<number, Handler>();

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

            clients.set(session.id, async (message) => {

                const type = "play";
                const data = {
                    type: message.type,
                    url: message.url
                }

                const event = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;

                response.raw.write(event);
            });

            request.raw.on("close", () => {

                clients.delete(session.id);
            });
        }
        else {

            response.code(404).send("Session not found");
        }
    });
};

export default route;