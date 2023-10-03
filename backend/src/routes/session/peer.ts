import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import prisma from "../../utils/prisma";

const Body = Type.Object({ code: Type.String() });

type BodyType = Static<typeof Body>;

interface Peer extends RequestGenericInterface {
    Body: BodyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<Peer>("/session/peer", {
        schema: {
            body: Body
        }
    }, async (request, response) => {

        const { code } = request.body;

        const id = await fastify.redis.codes.getdel(code);

        if (id === null) {

            response.code(401);

            return;
        }

        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: Number(id)
            }
        });

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const jwt = await response.jwtSign({
            ip,
            agent,
            session: session.id,
        }, {
            expiresIn: "12h"
        });

        response.code(200).send({
            token: jwt
        });
    });
};

export default route;