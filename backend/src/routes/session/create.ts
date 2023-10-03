import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import prisma from "../../utils/prisma";

const Body = Type.Object({});
const Reply = Type.Object({ session: Type.Number() });

type BodyType = Static<typeof Body>;
type ReplyType = Static<typeof Reply>;

interface Create extends RequestGenericInterface {
    Body: BodyType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Create>("/session", {
        schema: {
            tags: [
                "session"
            ],
            description: "Create a new session and start accepting links",
            body: Body,
            response: {
                200: Reply
            }
        }
    }, async (request, response) => {

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const session = await prisma.session.create({
            data: {
                ip,
                agent
            }
        });

        await response.code(200).send({
            session: session.id
        });
    });
};

export default route;