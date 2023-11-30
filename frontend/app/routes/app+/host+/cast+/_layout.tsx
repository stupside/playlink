import { FC } from "react";

import { Outlet, useNavigate } from "@remix-run/react";

import useSse from "~/hooks/sse/useSse";

const PageComponent: FC = () => {
  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/content/cast",
      handler: async ({ id, type }) => {
        navigate(`/app/host/cast/${id}/${type}`);
      },
    },
  });

  return <Outlet />;
};

export default PageComponent;
