import { useEffect, type FC } from "react";

import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";

import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

import { Digits, Timer } from "@playlink/ui-typography";
import { QrCodeOutput } from "@playlink/ui-zxing";
import { FocusableBoundary } from "@playlink/ui-navigation";

import { apiClient } from "~/server/api.server";
import storage from "~/server/storage/session.server";

import useSse from "~/client/hooks/useSse";

import Sse from "~/client/components/features/Sse";

import Logo from "~/client/components/commons/Logo";

import { Header, Footer } from "~/client/components/layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
  const data = useLoaderData<typeof loader>();
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.submit(
        {},
        {
          method: "GET",
        },
      );
    }, data.expiry * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data.expiry, fetcher.submit]);

  return (
    <>
      <Header>
        <Logo />
      </Header>
      <FocusableBoundary focus lock>
        {({ ref }) => (
          <section ref={ref} className="flex items-center gap-x-24 m-auto">
            <article className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-3">
                <h1 className="text-3xl font-medium">Scan the QR code</h1>
                <h2 className="text-xl font-medium text-zinc-200">
                  Or enter the key manually
                </h2>
              </div>
              <Digits raw={fetcher.data?.raw || data.raw} />
              <Timer
                key={fetcher.data?.raw ?? data.raw}
                expiry={fetcher.data?.expiry || data.expiry}
              >
                {Valid}
              </Timer>
            </article>
            <QrCodeOutput qr={fetcher.data?.qr || data.qr} />
          </section>
        )}
      </FocusableBoundary>
      <Footer>
        <Sse.Status />
      </Footer>
    </>
  );
};

const Valid: FC<{ remaining: number }> = ({ remaining }) => {
  return (
    <p className="font-bold text-lg">
      Key still valid for <span className="font-mono">{remaining}</span> sec
    </p>
  );
};

export default PageComponent;
