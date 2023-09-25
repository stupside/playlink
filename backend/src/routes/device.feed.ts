import { FastifyInstance, RequestGenericInterface } from "fastify";

import { connections as clients } from "./device.host.connect";
import { SessionCodeJwt } from "./device.host";
import prisma from "../utils/prisma";
import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({ token: Type.String(), m3u8: Type.String() });

type BodyType = Static<typeof Body>;

interface Feed extends RequestGenericInterface {
    Body: BodyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<Feed>("/device/feed", {}, async (request, response) => {

        const { token, m3u8 } = request.body;

        const jwt = fastify.jwt.verify<SessionCodeJwt>(token);

        const session = await prisma.session.findUnique({
            where: {
                id: jwt.session
            }
        });

        if (session) {

            await prisma.link.create({
                data: {
                    type: "m3u8",
                    url: m3u8,
                    sessionId: session.id
                }
            });

            const client = clients.get(session.id);

            if (client) {

                client?.socket.send(JSON.stringify({
                    m3u8
                }));

                response.code(200).send("Client feed");
            }
            else {
                response.code(404).send("Client not found");
            }
        }
        else {
            response.code(404).send("Session not found");
        }
    });
};

export default route;