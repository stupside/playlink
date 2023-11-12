import { type FC } from "react";

import Sse from "~/client/components/features/Sse";

import Logo from "~/client/components/commons/Logo";

import { Header, Footer } from "~/client/components/layout";

const PageComponent: FC = () => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <section className="m-auto">
        <h1 className="text-3xl font-bold animate-pulse">
          Waiting for content...
        </h1>
      </section>
      <Footer>
        <Sse.Status />
      </Footer>
    </>
  );
};

export default PageComponent;
