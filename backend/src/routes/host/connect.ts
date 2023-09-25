
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import WebSocket from "ws";
import prisma from "../../utils/prisma";

type Session = { socket: WebSocket };

// TODO: https://github.com/fastify/fastify-awilix
export const connections = new Map<number, Session>();

export const QueryString = Type.Object({
    session: Type.Number()
});

type QueryStringType = Static<typeof QueryString>;

interface Connect extends RequestGenericInterface {
    Querystring: QueryStringType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Connect>("/connect", {
        websocket: true, schema: {
            querystring: QueryString
        }
    },
        async (stream, request) => {

            const session = await prisma.session.findUnique({ where: { id: request.query.session } });

            if (session) {

                stream.on("open", async () => {

                    connections.set(session?.id, {
                        socket: stream.socket,
                    });
                });

                stream.on("close", async () => {

                    connections.delete(session.id);
                });
            }
            else {
                stream.socket.close(404, "Session not found");
            }

        });
};

export default route;