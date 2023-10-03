import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import crypto from "crypto";
import QRCode from "qrcode";

import { randomUUID } from "crypto";

import prisma from "../../../utils/prisma";

const Params = Type.Object({ session: Type.Number() });
const Query = Type.Object({ expiry: Type.Number({ minimum: 15, maximum: 120, default: 30 }) });
const Reply = Type.Object({ qr: Type.String(), code: Type.String(), expiry: Type.Number() });

type ParamsType = Static<typeof Params>;
type QueryType = Static<typeof Query>;
type ReplyType = Static<typeof Reply>;

interface Code extends RequestGenericInterface {
    Params: ParamsType,
    Querystring: QueryType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.get<Code>("/session/:session/code", {
        schema: {
            tags: [
                "session"
            ],
            description: "Generate a unique code and qr code to retrieve a temporary token an be able to send links to the host",
            params: Params,
            response: {
                200: Reply
            }
        }
    }, async (request, response) => {

        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: request.params.session
            }
        });

        const hasher = crypto.createHash("sha256");

        const hash = hasher.update(`${session.id}.${randomUUID()}`).digest("base64");

        await fastify.redis.codes.setex(hash, request.query.expiry, session.id);

        const qr = await QRCode.toDataURL(hash);

        await response.code(200).send({
            qr,
            code: hash,
            expiry: request.query.expiry,
        });
    });
};

export default route;