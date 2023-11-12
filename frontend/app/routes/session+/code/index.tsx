import { ActionFunctionArgs, json } from "@remix-run/node";

import { useFetcher, useNavigate } from "@remix-run/react";

import { FC } from "react";

import { getCode } from "~/bff/sessions.server";

import useSse from "~/hooks/sse/useSse";

import storage from "~/storage";

import Footer from "~/components/Layout/Footer";
import QrCode from "~/components/QrCode/Output";
import Code from "~/components/Code";
import Sse from "~/components/Sse";
import Timer from "~/components/Timer";

const TOKEN_EXPIRY = 120;

export const action = async ({ request }: ActionFunctionArgs) => {
  const code = await storage.fromCookies(request, async (session) => {
    const token = storage.requireValue(session, "token");

    return getCode(token.value, TOKEN_EXPIRY);
  });

  return json(code);
};

const PageComponent: FC = () => {
  const fetcher = useFetcher<typeof action>();

  const refreshing =
    fetcher.state === "loading" || fetcher.state === "submitting";

  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/device/token",
      handler: async () => {
        navigate("/session/content");
      },
    },
  });

  return (
    <>
      <div className="flex items-center gap-x-14 md:gap-x-28 mx-auto h-auto">
        <div className="flex flex-col">
          <span className="text-md font-bold">Code</span>
          <Code code={fetcher.data?.code} />
        </div>
        <div className="flex flex-col justify-center gap-y-3 p-5 bg-zinc-900 h-full">
          <div className="flex gap-x-3 justify-end items-center">
            <Timer key={fetcher.data?.key} expiry={fetcher.data?.expiry} />
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
