import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import { createHmac } from "node:crypto";

import QRCode from "qrcode";

import prisma from "../utils/prisma";

const Body = Type.Object({ session: Type.Number(), password: Type.String() });
const Reply = Type.Object({ qr: Type.String() });

type BodyType = Static<typeof Body>;
type ReplyType = Static<typeof Reply>;

interface Code extends RequestGenericInterface {
    Body: BodyType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Code>("/device/code", {}, async (request, response) => {

        const session = await prisma.session.findUnique({
            where: {
                id: request.body.session
            }
        });

        if (session) {

            const md5 = createHmac("md5", "secret");

            const hash = request.body.password;

            md5.update(hash);

            const raw = {
                session: session.id
            } as SessionCodeJwt;

            const jwt = fastify.jwt.sign(raw, { notBefore: Date.now(), expiresIn: 120 * 1000 });

            const qr = await QRCode.toDataURL(jwt);

            await response.code(200).send({
                qr
            });
        }
        else {

            response.code(403);
        }
    });
};

export default route;