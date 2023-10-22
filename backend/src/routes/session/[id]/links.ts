
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../../utils/prisma";

export const Params = Type.Object({
    session: Type.Number(),
});

export const Reply = Type.Array(Type.Object({
    url: Type.String(),
    type: Type.String(),
}));

type ParamsType = Static<typeof Params>;
type ReplyType = Static<typeof Reply>;

interface Link extends RequestGenericInterface {
    Params: ParamsType,
    Reply: ReplyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Link>("/session/:session/link", {
        schema: {
            tags: [
                "session"
            ],
            description: "Get this links for the desired session.",
            params: Params,
            response: {
                200: Reply
            }
        }
    }, async (request, response) => {

        const links = await prisma.link.findMany(({
            where: {
                sessionId: request.params.session
            },
            select: {
                url: true,
                type: true
            }
        }));

        response.code(200).send(links);
    });
};

export default route;