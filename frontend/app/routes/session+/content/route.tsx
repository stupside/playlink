import { FC } from "react";

import { useNavigate } from "@remix-run/react";

import useSse from "~/hooks/sse/useSse";

const PageComponent: FC = () => {
  const navigate = useNavigate();

  useSse({
    connector: {
      event: "/content/create",
      handler: async (content) => {
        navigate(`/session/content/${content.id}`);
      },
    },
  });

  return <div>Waiting for content</div>;
};

export default PageComponent;
