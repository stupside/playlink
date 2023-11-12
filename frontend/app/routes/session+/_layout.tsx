import { FC } from "react";

import { Outlet, useLoaderData } from "@remix-run/react";

import { LoaderFunctionArgs, json } from "@remix-run/node";

import storage from "~/storage";

import Sse from "~/components/Sse";

const ENDPOINT = "/api/session/sse";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = await storage.fromCookies(request, async (session) => {
    return storage.requireValue(session, "token");
  });

  return json({
    session: token.session,
  });
};

const PageComponent: FC = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <Sse key={data.session} loader={ENDPOINT}>
      <Outlet />
    </Sse>
  );
};

export default PageComponent;
