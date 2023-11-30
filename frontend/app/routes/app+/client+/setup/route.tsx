import { FC } from "react";

import Center from "~/components/Center";
import Extension from "~/components/Extension";

const PageComponent: FC = () => {
  return (
    <Center>
      <ul className="flex flex-col gap-y-5">
        <li>
          <Extension browser={"edge"} url="" />
        </li>
        <li>
          <Extension browser={"chrome"} url="" />
        </li>
        <li>
          <Extension browser={"firefox"} url="" />
        </li>
      </ul>
    </Center>
  );
};

export default PageComponent;
