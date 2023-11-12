import { useEffect } from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";

import {
  json,
  type LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
} from "@remix-run/node";

import { UAParser, type IResult } from "ua-parser-js";

import { initFocusables } from "@playlink/ui-navigation";

import UserAgentContext from "./client/components/features/UserAgent";

import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "description",
      content: "Send content from a device to another",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "title",
      content: "Playlink",
    },
    {
      name: "og:title",
      content: "Playlink",
    },
    {
      name: "og:description",
      content: "Send content from a device to another",
    },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const agent = request.headers.get("user-agent");

  return json({
    context: agent ? new UAParser(agent).getResult() : undefined,
    navigation: {
      debug: Boolean(process.env.PLAYLINK_NAVIGATION_DEBUG),
      visual: Boolean(process.env.PLAYLINK_NAVIGATION_VISUAL_DEBUG),
    },
  });
};

const App = () => {
  const { context } = useLoaderData<typeof loader>();

  useEffect(() => {
    initFocusables({
      // debug: navigation.debug,
      // visualDebug: navigation.visual,
      shouldFocusDOMNode: true,
      shouldUseNativeEvents: true,
      useGetBoundingClientRect: true,
    });
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="flex h-screen w-full overflow-x-hidden text-zinc-200 bg-zinc-800">
        <UserAgentContext.Provider value={context as IResult | undefined}>
          <Outlet />
          <Scripts />
          <LiveReload />
        </UserAgentContext.Provider>
      </body>
    </html>
  );
};

export default App;
