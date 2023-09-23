
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { createHmac } from "node:crypto";

import WebSocket from "ws";
import prisma from "../utils/prisma";

type Session = { socket: WebSocket };

// TODO: https://github.com/fastify/fastify-awilix
export const connections = new Map<number, Session>();

interface Connect extends RequestGenericInterface {
    Body: {
        session: number,
        password: string,
    },
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Connect>("/device/connect", { websocket: true, onRequest: fastify.csrfProtection },
        async (stream, request) => {

            const session = await prisma.session.findUnique({ where: { id: request.body.session } });

            if (session) {

                const md5 = createHmac("md5", "secret"); // TODO: hardcoded

                const hash = request.body.password;

                md5.update(hash);

                if (hash == session.password) {

                    stream.on("open", async () => {

                        // TODO: https://github.com/fastify/fastify-request-context
                        // TODO: https://github.com/fastify/fastify-secure-session

                        connections.set(session?.id, {
                            socket: stream.socket,
                        });
                    });

                    stream.on("close", async () => {

                        connections.delete(session.id);
                    });
                }
                else {
                    stream.socket.close();
                }
            }
            else {
                stream.socket.close();
            }

        });
};

export default route;