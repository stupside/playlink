import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import { RecoilRoot } from "recoil";

import styles from "./tailwind.css";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

const App = () => {

  const { ref, focusKey, focusSelf } = norigin.useFocusable({
    isFocusBoundary: true,
    trackChildren: true
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf])

  
  useEffect(() => {

    norigin.init({
      debug: true,
      visualDebug: true
    });
  }, [norigin.init]);



  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <RecoilRoot>
          <norigin.FocusContext.Provider value={focusKey}>
            <div ref={ref} className="flex items-center align-middle" style={{
              minHeight: "inherit"
            }}>
              <Outlet />
            </div>
          </norigin.FocusContext.Provider>
        </RecoilRoot>

        <Scripts />
      </body>
    </html>
  );
}

export default App;