import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

import type { LinksFunction, MetaFunction } from "@remix-run/node";

import { useEffect } from "react";
import { RecoilRoot } from "recoil";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "Playlink" },
    {
      property: "og:title",
      content: "Playlink",
    },
    {
      name: "description",
      content: "Send content from a device to another",
    },
  ];
};

const App = () => {
  const { ref, focusKey, focusSelf } = norigin.useFocusable({
    isFocusBoundary: true,
    trackChildren: true,
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  useEffect(() => {
    norigin.init({
      debug: false,
      visualDebug: false,
    });
  }, [norigin.init]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body
        ref={ref}
        className="flex h-screen w-full overflow-x-hidden text-white bg-gradient-to-t from-zinc-900 to-black"
      >
        <RecoilRoot>
          <norigin.FocusContext.Provider value={focusKey}>
            <Outlet />
          </norigin.FocusContext.Provider>
        </RecoilRoot>
        <Scripts />
      </body>
    </html>
  );
};

export default App;
