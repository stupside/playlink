import { FC } from "react";

import Header from "~/components/Layout/Header";
import Center from "~/components/Center";
import Logo from "~/components/Logo";

const PageComponent: FC = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Center>
        <h1 className="text-5xl font-bold mb-7">Welcome</h1>
      </Center>
    </>
  );
};

export default PageComponent;
