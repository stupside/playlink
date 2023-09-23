import { FastifyInstance, RequestGenericInterface } from "fastify";

import QRCode from "qrcode";
import { devices } from "./device.connect";

interface GetDeviceCode extends RequestGenericInterface {
    Body: { uuid: string },
    Reply: { qr: string }
}

export interface DeviceCodeJwt { uuid: string };

const route = async (fastify: FastifyInstance) => {

    const getJwtValidity = (seconds: number) => {

        const now = Date.now();

        return {
            from: now,
            to: now + seconds * 1000
        };
    }

    fastify.get<GetDeviceCode>("/device/code", {}, async (request, response) => {

        const device = devices.get(request.body.uuid);

        if (device) {

            const { from, to } = getJwtValidity(10);

            const raw = {
                uuid: request.body.uuid
            } as DeviceCodeJwt;

            const jwt = fastify.jwt.sign(raw, { notBefore: from, expiresIn: to });

            const qr = await QRCode.toString(jwt);

            await response.code(200).send({
                qr
            });
        }

        await response.code(404);
    });
};

export default route;