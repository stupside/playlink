import { FastifyInstance, RequestGenericInterface } from "fastify";

import { devices } from "./device.connect";
import { DeviceCodeJwt } from "./device.code";

interface FeedDevice extends RequestGenericInterface {
    Body: { jwt: string, m3u8: string },
}

const route = async (fastify: FastifyInstance) => {

    fastify.get<FeedDevice>("/device/feed", {}, async (request, response) => {

        const { jwt, m3u8 } = request.body;

        const { uuid } = fastify.jwt.verify<DeviceCodeJwt>(jwt);

        const device = devices.get(uuid);

        device?.socket.send(m3u8);
    });
};

export default route;