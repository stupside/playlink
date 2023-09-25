import { FastifyInstance } from "fastify";

import AutoLoad from "@fastify/autoload";
import path from "path";

const router = (fastify: FastifyInstance) => {

    fastify.register(AutoLoad, {
        prefix: "/host",
        dir: path.join(__dirname, 'host')
    });
};

export default router;