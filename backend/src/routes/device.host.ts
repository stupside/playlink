import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import { createHmac } from "node:crypto";

import QRCode from "qrcode";

import prisma from "../utils/prisma";

const Body = Type.Object({ password: Type.String() });
const Reply = Type.Object({ qr: Type.String(), session: Type.Number(), token: Type.String() });

type BodyType = Static<typeof Body>;
type ReplyType = Static<typeof Reply>;

interface Host extends RequestGenericInterface {
    Body: BodyType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Host>("/device/host", {}, async (request, response) => {

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const md5 = createHmac("md5", "secret"); // TODO: hardcoded

        const hash = request.body.password;

        md5.update(hash);

        const session = await prisma.session.create({
            data: {
                ip,
                agent,
                password: hash
            }
        });

        const raw = {
            session: session.id
        } as SessionCodeJwt;

        const jwt = fastify.jwt.sign(raw, { notBefore: Date.now(), expiresIn: 120 * 1000 });

        const qr = await QRCode.toDataURL(jwt);

        const csrf = response.generateCsrf();

        await response.code(200).send({
            qr,
            session: session.id,
            token: csrf,
        });
    });
};

export default route;