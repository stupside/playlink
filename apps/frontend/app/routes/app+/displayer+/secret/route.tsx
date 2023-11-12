import { type FC } from "react";

import { type ActionFunctionArgs, json } from "@remix-run/node";

import { useFetcher, useNavigate } from "@remix-run/react";

import { QrCodeOutput } from "@playlink/ui-zxing";
import { Digits, Timer } from "@playlink/ui-typography";
import { FocusableBoundary } from "@playlink/ui-navigation";

import { apiClient } from "~/server/api.server";
import storage from "~/server/storage/session.server";

import useSse from "~/client/hooks/useSse";

import Sse from "~/client/components/features/Sse";

import Refresh from "./components/Refresh";

import Logo from "~/client/components/commons/Logo";

import { Header, Footer } from "~/client/components/layout";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { token } = await storage.fromCookies(request, async (session) =>
    storage.requireValue(session, "context"),
  );

  const { data } = await apiClient(request).GET("/sessions", {
    params: {
      query: {
        expiry: +process.env.PLAYLINK_SESSION_EXPIRY!,
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return json(data);
};

const PageComponent: FC = () => {
  const fetcher = useFetcher<typeof action>();

  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/session/connect",
      handler: async () => {
        navigate("/app/displayer/cast");
      },
    },
  });

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <FocusableBoundary lock>
        {({ ref }) => (
          <section ref={ref} className="flex items-center gap-x-24 m-auto">
            <article className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-3">
                <h1 className="text-3xl font-medium">Scan the QR code</h1>
                <h2 className="text-xl font-medium text-zinc-200">
                  Or enter the key manually
                </h2>
              </div>
              <Digits raw={fetcher.data?.raw} />
              <div className="flex items-center gap-x-3">
                <fetcher.Form method="POST">
                  <Refresh disabled={fetcher.state === "loading"} />
                </fetcher.Form>
                <Timer key={fetcher.data?.raw} expiry={fetcher.data?.expiry} />
              </div>
            </article>
            <QrCodeOutput qr={fetcher.data?.qr} />
          </section>
        )}
      </FocusableBoundary>
      <Footer>
        <Sse.Status />
      </Footer>
    </>
  );
};

export default PageComponent;
