import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import QRCode from "qrcode";

import prisma from "../../utils/prisma";

const QueryString = Type.Object({ session: Type.Number(), expiry: Type.Number({ default: 120 }) });
const Reply = Type.Object({ qr: Type.String(), token: Type.String() });

type QueryStringType = Static<typeof QueryString>;
type ReplyType = Static<typeof Reply>;

interface Code extends RequestGenericInterface {
    Querystring: QueryStringType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.get<Code>("/host/code", {}, async (request, response) => {

        const session = await prisma.session.findUnique({
            where: {
                id: +request.query.session
            }
        });

        if (session) {

            const raw = {
                session: session.id
            } as SessionCodeJwt;

            const jwt = fastify.jwt.sign(raw, {
                expiresIn: request.query.expiry * 1000
            });

            const qr = await QRCode.toDataURL(jwt);

            await response.code(200).send({
                qr,
                token: jwt
            });
        }
        else {

            response.code(404);
        }
    });
};

export default route;