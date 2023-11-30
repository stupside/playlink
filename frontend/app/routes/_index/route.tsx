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
        <h1 className="text-3xl font-bold">Welcome to playlink</h1>
      </Center>
    </>
  );
};

export default PageComponent;
