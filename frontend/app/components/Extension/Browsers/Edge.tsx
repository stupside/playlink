import { FC, HTMLProps } from "react";

import svg from "./edge.svg";

const Edge: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return <img src={svg} title="edge" {...props} />;
};

export default Edge;
