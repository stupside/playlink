import { Static } from "@sinclair/typebox";

import { MyRoute, PlaylinkSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

import retrieve from "../../content/retrieve";
import sse from "../../hook/sse";
import secret from "../secret";

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const session = await prisma.session.create({
    data: {},
  });

  const device = await prisma.device.create({
    data: {
      ip: request.body.ip ?? request.ip,
      agent: request.body.agent ?? request.headers["user-agent"],
      sessionId: session.id,
    },
  });

  const payload: Static<typeof PlaylinkSessionSchema> = {
    device: device.id,
    session: session.id,
    claims: [sse.Claim, secret.Claim, retrieve.Claim],
  };

  const token = await response.jwtSign(payload);

  return await response.send({
    token,
    device: device.id,
    session: session.id,
  });
};
