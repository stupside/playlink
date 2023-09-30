import { FastifyInstance, RequestGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

import QRCode from "qrcode";

import prisma from "../../utils/prisma";

const Params = Type.Object({ session: Type.Number() });
const Reply = Type.Object({ qr: Type.String(), token: Type.String() });

type ParamsType = Static<typeof Params>;
type ReplyType = Static<typeof Reply>;

interface Code extends RequestGenericInterface {
    Params: ParamsType,
    Reply: ReplyType
}

export interface SessionCodeJwt { session: number };

const route = async (fastify: FastifyInstance) => {

    fastify.get<Code>("/session/:session/code", {
        schema: {
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

        if (session) {

            const raw = {
                session: session.id
            } as SessionCodeJwt;

            const jwt = fastify.jwt.sign(raw, {
                expiresIn: 120 * 1000
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