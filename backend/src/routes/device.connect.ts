import { randomUUID } from "crypto";
import { FastifyInstance, RequestGenericInterface } from "fastify";

import WebSocket from "ws";

type Device = { nonce: string, socket: WebSocket };

// TODO: https://www.npmjs.com/package/@fastify/request-context
export const devices = new Map<string, Device>();

interface ConnectDevice extends RequestGenericInterface {
    Headers: { id: string },
    Body: { nonce: string },
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<ConnectDevice>("/device/connect", { websocket: true },
        async (stream, request) => {

            const uuid = randomUUID();

            stream.on("open", async () => {

                // TODO: https://github.com/fastify/fastify-request-context
                // TODO: https://github.com/fastify/fastify-secure-session
                devices.set(uuid, {
                    nonce: request.body.nonce,
                    socket: stream.socket,
                });
            });

            stream.on("close", async () => {

                devices.delete(uuid);
            })
        });
};

export default route;