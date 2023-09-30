import fastify from 'fastify';

import AutoLoad from "@fastify/autoload";

import path from "path";

import env from "./env";

const prepare = async () => {

    const server = fastify({
        logger: true
    });

    await server.register(env);

    await server.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins')
    });

    await server.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        dirNameRoutePrefix: false
    });

    await server.ready();

    return server;
};

prepare().then(server => {

    server.listen({
        port: server.config.PORT
    }, (error) => {

        if (error) {

            console.error(error);
        }
    });
});