import { FastifyInstance, RequestGenericInterface } from "fastify";

import { createHmac } from "node:crypto";

import QRCode from "qrcode";

import prisma from "../utils/prisma";
import { getJwtValidity } from "../utils/jwt";

interface Host extends RequestGenericInterface {
    Reply: { qr: string, session: number, token: string }
    Body: { password: string }
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.post<Host>("/device/host", {}, async (request, response) => {

        const ip = request.ip;
        const agent = request.headers["user-agent"];

        const { from, to } = getJwtValidity(120);

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

        const jwt = fastify.jwt.sign(raw, { notBefore: from, expiresIn: to });

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