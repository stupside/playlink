
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../utils/prisma";

// TODO: https://github.com/fastify/fastify-awilix
export const clients = new Map<number, (params: { type: string, url: string }) => Promise<void>>();

export const QueryString = Type.Object({
    session: Type.Number()
});

type QueryStringType = Static<typeof QueryString>;

interface Connect extends RequestGenericInterface {
    Querystring: QueryStringType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Connect>("/host/connect", {}, async (request, response) => {

        const session = await prisma.session.findUnique({
            where: {
                id: +request.query.session
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

                response.raw.write(message);
            });

            request.raw.on("close", () => {

                clients.delete(session.id);
            });
        }
    });
};

export default route;