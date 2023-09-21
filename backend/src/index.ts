import fastify from 'fastify';

import AutoLoad from "@fastify/autoload";

import path from "path";

const server = fastify();

server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
});

server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: false
});

server.listen({}, (err, address) => {

    if (err) {

        console.error(err);

        process.exit(1);
    }

    console.log(`Started server at ${address}`);
});