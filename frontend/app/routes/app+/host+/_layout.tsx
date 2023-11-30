import { FC } from "react";

import { Outlet } from "@remix-run/react";

import Sse from "~/components/Sse";

const ENDPOINT = "/api/sessions/hooks/sse";

const PageComponent: FC = () => {
  return (
    <Sse loader={ENDPOINT}>
      <Outlet />
    </Sse>
  );
};

export default PageComponent;
