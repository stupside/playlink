import { ActionFunctionArgs, json } from "@remix-run/node";

import { useFetcher, useNavigate } from "@remix-run/react";

import { FC } from "react";

import useSse from "~/hooks/sse/useSse";

import storage from "~/storage";

import Sse from "~/components/Sse";
import Timer from "~/components/Timer";
import Key from "~/components/Key/Output";
import Footer from "~/components/Layout/Footer";
import QrCode from "~/components/QrCode/Output";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context")
  );

  const response = await fetch(
    `${process.env.PLAYLINK_BACKEND_URL}/sessions/secret?expiry=${process.env.PLAYLINK_SESSION_EXPIRY}`,
    {
      method: "GET",
      headers: {
        ...request.headers,
        [process.env.PLAYLINK_TOKEN_HEADER_KEY!]: token,
      },
    }
  );

  const key = (await response.json()) as {
    qr: string;
    raw: string;
    expiry: number;
  };

  return json(key);
};

const PageComponent: FC = () => {
  const fetcher = useFetcher<typeof action>();

  const refreshing =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/session/connect",
      handler: async () => {
        navigate("/app/host/cast");
      },
    },
  });

  return (
    <>
      <div className="flex items-center gap-x-14 md:gap-x-28 mx-auto h-auto">
        <div className="flex flex-col">
          <span className="text-md font-bold">Key</span>
          <Key raw={fetcher.data?.raw} />
        </div>
        <div className="flex flex-col justify-center gap-y-3 p-5 bg-zinc-900 h-full">
          <div className="flex gap-x-3 justify-end items-center">
            <Timer key={fetcher.data?.raw} expiry={fetcher.data?.expiry} />
            <QrCode.Refresh
              refreshing={refreshing}
              Form={({ children }) => {
                return <fetcher.Form method="POST">{children}</fetcher.Form>;
              }}
            />
          </div>
          <div>
            <QrCode qr={fetcher.data?.qr} />
          </div>
        </div>
      </div>
      <Footer>
        <Sse.Status />
      </Footer>
    </>
  );
};

export default PageComponent;
