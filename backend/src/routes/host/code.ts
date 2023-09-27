import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import QRCode from "qrcode";

import prisma from "../../utils/prisma";

const Body = Type.Object({ session: Type.Number(), expiry: Type.Number({ default: 120 }) });
const Reply = Type.Object({ qr: Type.String(), token: Type.String() });

type BodyType = Static<typeof Body>;
type ReplyType = Static<typeof Reply>;

interface Code extends RequestGenericInterface {
    Body: BodyType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Code>("/host/code", {}, async (request, response) => {

        const session = await prisma.session.findUnique({
            where: {
                id: request.body.session
            }
        });

        if (session) {

            const raw = {
                session: session.id
            } as SessionCodeJwt;

            const jwt = fastify.jwt.sign(raw, { notBefore: Date.now(), expiresIn: request.body.expiry * 1000 });

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