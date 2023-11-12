import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";

import { FC } from "react";

import { useFetcher, useLoaderData } from "@remix-run/react";

import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import storage from "~/storage";

import { getToken } from "~/bff/sessions.server";

import Center from "~/components/Center";

const Action = Type.Object({
  key: Type.String(),
  code: Type.String(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();

  const entries = Object.fromEntries(form);

  const { key, code } = Value.Decode(Action, entries);

  const cookie = await storage.fromCookies(request, async (session) => {
    const token = await getToken(key, code, "anonyme");

    session.set("token", token);

    return storage.commitSession(session);
  });

  return redirect("/session/content", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

const Loader = Type.Object({
  key: Type.String(),
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { key } = Value.Decode(Loader, params);

  return json({ key: decodeURIComponent(key) });
};

const PageComponent: FC = () => {
  const fetcher = useFetcher<typeof action>();
  const data = useLoaderData<typeof loader>();

  return (
    <Center>
      <div className="flex gap-5">
        <fetcher.Form method="POST">
          <input
            hidden
            readOnly
            title="key"
            name="key"
            type="text"
            value={data.key}
          />
          <div className="flex flex-col gap-3">
            <div>
              <input
                title="code"
                name="code"
                type="text"
                placeholder="code"
                className="text-3xl text-black rounded-md py-3 px-2"
              />
            </div>
          </div>
          <div>
            <button
              title="token"
              type="submit"
              className="flex items-center bg-white text-black rounded-md py-1 px-3"
            >
              Connect
            </button>
          </div>
        </fetcher.Form>
      </div>
    </Center>
  );
};

export default PageComponent;
