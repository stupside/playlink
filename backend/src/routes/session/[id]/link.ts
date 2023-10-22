
import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from '@sinclair/typebox'

import prisma from "../../../utils/prisma";

export const Params = Type.Object({
    session: Type.Number(),
    link: Type.Number(),
});

export const Reply = Type.Object({
    url: Type.String(),
    type: Type.String(),
});

type ParamsType = Static<typeof Params>;
type ReplyType = Static<typeof Reply>;

interface Link extends RequestGenericInterface {
    Params: ParamsType,
    Reply: ReplyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<Link>("/session/:session/link/:link", {
        schema: {
            tags: [
                "session"
            ],
            description: "Get a link by its id.",
            params: Params,
            response: {
                200: Reply
            }
        }
    }, async (request, response) => {

        const link = await prisma.link.findUniqueOrThrow({
            where: {
                id: request.params.link,
                sessionId: request.params.session
            },
            select: {
                url: true,
                type: true,
            }
        });

        response.code(200).send(link);
    });
};

export default route;