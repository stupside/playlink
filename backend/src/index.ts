import fastify from "fastify";

import AutoLoad from "@fastify/autoload";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import path from "path";

import env from "./env";

const prepare = async () => {
  const server = fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(env);

  await server.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
  });

  await server.register(AutoLoad, {
    routeParams: true,
    dirNameRoutePrefix: false,
    dir: path.join(__dirname, "routes"),
  });

  await server.ready();

  return server;
};

prepare().then((server) => {
  server.listen(
    {
      port: server.config.PORT,
    },
    (error) => {
      if (error) {
        server.log.error(error);
      }
    }
  );
});
