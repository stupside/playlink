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
      <body>
        <h1>Playlink</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export default App;