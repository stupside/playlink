import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { hostSession } from "~/bff/sessions.server";

import storage from "~/storage";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookie = await storage.fromCookies(request, async (session) => {
    const host = await hostSession();

    session.set("token", {
      value: host.token,
      device: host.device,
      session: host.session,
    });

    return storage.commitSession(session);
  });

  return redirect("/session/code", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
