import { FastifyInstance, RequestGenericInterface } from "fastify";

interface Hello extends RequestGenericInterface {
    Body: { name: string }
}

const route = async (fastify: FastifyInstance) => {

    fastify.post<Hello>("/hello", {}, async (request, response) => {
        response.send(`Hello ${request.body.name}`);
    });
};

export default route;