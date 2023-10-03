import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import prisma from "../../utils/prisma";

const Body = Type.Object({
    url: Type.String({ description: "An url." }),
    type: Type.String({ description: "The type of the content the url is pointing to." }),
    token: Type.String({ description: "The token generated from a code sent by the host." }),
});

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
            description: "Send a link to the host.",
            body: Body
        }
    }, async (request, response) => {

        const { url, type, token } = request.body;

        const payload = fastify.jwt.verify<{
            ip: string,
            agent?: string,
            session: number,
        }>(token);

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