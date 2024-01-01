import { useEffect } from "react";

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import { type LinksFunction, type MetaFunction } from "@remix-run/node";

import { initFocusables } from "@playlink/ui-navigation";

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

const App = () => {
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
        <Outlet />
        <Scripts />
        <LiveReload />
        <ScrollRestoration />
      </body>
    </html>
  );
};

export default App;
