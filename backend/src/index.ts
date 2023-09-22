import fastify from 'fastify';

import AutoLoad from "@fastify/autoload";

import path from "path";

const server = fastify({
    logger: true,
});

server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
});

server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false
});

server.listen({}, (error) => {

    if (error) {

        console.error(error);

        process.exit(1);
    }
});