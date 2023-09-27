import fastify from 'fastify';

import AutoLoad from "@fastify/autoload";

import path from "path";

const main = async () => {

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

    server.listen({
        port: 3000 // TODO: hardcorded
    }, (error) => {

        if (error) {

            console.error(error);
        }
    });
};

main();