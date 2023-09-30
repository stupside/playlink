
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../utils/prisma";

type Handler = (params: { type: string, url: string }) => Promise<void>;

// TODO: https://github.com/fastify/fastify-awilix
export const clients = new Map<number, Handler>();

export const Params = Type.Object({
    session: Type.Number()
});

type ParamsType = Static<typeof Params>;

interface Stream extends RequestGenericInterface {
    Params: ParamsType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Stream>("/host/:session/stream", {
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
            }

            response.raw.writeHead(200, headers);

            clients.set(session.id, async (message) => {

                response.raw.write(JSON.stringify(message));
            });

            request.raw.on("close", () => {

                clients.delete(session.id);
            });
        }
    });
};

export default route;