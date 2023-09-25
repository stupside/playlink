import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";
import prisma from "../../utils/prisma";

const Body = Type.Object({});
const Reply = Type.Object({ session: Type.Number() });

type BodyType = Static<typeof Body>;
type ReplyType = Static<typeof Reply>;

interface Host extends RequestGenericInterface {
    Body: BodyType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Host>("/", {}, async (request, response) => {

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const session = await prisma.session.create({
            data: {
                ip,
                agent
            }
        });

        // TODO: secured session
        await response.code(200).send({
            session: session.id
        });
    });
};

export default route;