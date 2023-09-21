import { FastifyInstance, RequestGenericInterface } from "fastify";

import QRCode from "qrcode";
import { devices } from "./device.connect";

interface GetDeviceCode extends RequestGenericInterface {
    Body: { uuid: string },
    Reply: { qr: string }
}

export interface DeviceCodeJwt { uuid: string, nonce: string };

const route = async (fastify: FastifyInstance) => {

    fastify.get<GetDeviceCode>("/device/code", {}, async (request, response) => {

        const device = devices.get(request.body.uuid);

        if (device) {

            const jwt = fastify.jwt.sign({
                uuid: request.body.uuid,
                nonce: device.nonce
            } as DeviceCodeJwt);

            const qr = await QRCode.toString(jwt);

            // TODO: https://github.com/fastify/fastify-jwt
            await response.send({
                qr
            });
        }
    });
};

export default route;