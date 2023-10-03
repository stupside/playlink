import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import prisma from "../../utils/prisma";

const Params = Type.Object({ code: Type.String() });

type ParamsType = Static<typeof Params>;

interface Token extends RequestGenericInterface {
    Params: ParamsType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Token>("/session/:code/token", {
        schema: {
            params: Params
        }
    }, async (request, response) => {

        const { code } = request.params;

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