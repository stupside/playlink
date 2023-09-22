import { randomUUID } from "crypto";
import { FastifyInstance, RequestGenericInterface } from "fastify";

import WebSocket from "ws";

type Device = { socket: WebSocket };

// TODO: https://github.com/fastify/fastify-awilix
export const devices = new Map<string, Device>();

interface ConnectDevice extends RequestGenericInterface {
    Headers: { id: string },
    Body: {},
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<ConnectDevice>("/device/connect", { websocket: true },
        async (stream, request) => {

            const uuid = randomUUID();

            stream.on("open", async () => {

                // TODO: https://github.com/fastify/fastify-request-context
                // TODO: https://github.com/fastify/fastify-secure-session
                devices.set(uuid, {
                    socket: stream.socket,
                });
            });

            stream.on("close", async () => {
                devices.delete(uuid);
            });
        });
};

export default route;