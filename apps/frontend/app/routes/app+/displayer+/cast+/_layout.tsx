import { type FC } from "react";

import { Outlet, useNavigate } from "@remix-run/react";

import useSse from "~/client/hooks/useSse";

const PageComponent: FC = () => {
  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/content/cast",
      handler: async ({ id, type }) => {
        navigate(`/app/displayer/cast/${id}/${type}`, {
          replace: true,
        });
      },
    },
  });

  return <Outlet />;
};

export default PageComponent;
