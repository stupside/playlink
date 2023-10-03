import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import prisma from "../../utils/prisma";

const Body = Type.Object({ url: Type.String(), type: Type.String() });

type BodyType = Static<typeof Body>;

interface Link extends RequestGenericInterface {
    Body: BodyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<Link>("/session/link", {
        schema: {
            tags: [
                "session"
            ],
            description: "Send a link to the host",
            body: Body
        }
    }, async (request, response) => {

        const { url, type } = request.body;

        const payload = await request.jwtVerify<{
            ip: string,
            agent?: string,
            session: number,
        }>();

        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: payload.session
            }
        });

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const link = await prisma.link.create({
            data: {
                ip,
                agent,
                type,
                url,
                sessionId: session.id
            }
        });

        await fastify.redis.publisher.publish(`session.${session.id}.links`, link.id.toString());

        response.code(200);
    });
};

export default route;