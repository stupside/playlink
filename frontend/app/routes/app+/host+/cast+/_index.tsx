import { FC } from "react";

import Sse from "~/components/Sse";
import Logo from "~/components/Logo";
import Center from "~/components/Center";
import Footer from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";

const PageComponent: FC = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Center>
        <h1 className="text-3xl font-bold animate-pulse">
          Waiting for content...
        </h1>
      </Center>
      <Footer>
        <Sse.Status />
      </Footer>
    </>
  );
};

export default PageComponent;
