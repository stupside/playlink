import { FC, PropsWithChildren } from "react";

const Center: FC<PropsWithChildren> = ({ children }) => {
  return <div className="m-auto">{children}</div>;
};

export default Center;
