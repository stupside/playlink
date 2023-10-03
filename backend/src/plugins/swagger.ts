import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerui from "@fastify/swagger-ui";

/**
 * This plugins adds swagger
 *
 * @see https://github.com/fastify/fastify-swagger
 */
const plugin = fp(async (fastify, _) => {

    await fastify.register(swagger, {
        swagger: {
            info: {
                title: 'Playlink',
                description: 'API Documentation',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
            ],
            definitions: {
            },
        }
    });

    await fastify.register(swaggerui, {
        routePrefix: '/doc'
    })
});

export default plugin;

