import { FC, HTMLProps } from "react";

import svg from "./firefox.svg";

const Firefox: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return <img src={svg} title="firefox" {...props} />;
};

export default Firefox;
