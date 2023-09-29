import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

const App = () => {
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
      <body className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">

        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}

export default App;