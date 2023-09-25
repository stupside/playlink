import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance, RequestGenericInterface } from "fastify";


const Body = Type.Object({ name: Type.String() });

type BodyType = Static<typeof Body>;

interface Hello extends RequestGenericInterface {
    Body: BodyType,
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<Hello>("/hello", {}, async (request, response) => {
        response.send(`Hello ${request.body.name}`);
    });
};

export default route;