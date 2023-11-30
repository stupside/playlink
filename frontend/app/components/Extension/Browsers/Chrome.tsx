import { FC, HTMLProps } from "react";

import svg from "./chrome.svg";

const Chrome: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return <img src={svg} title="chrome" {...props} />;
};

export default Chrome;
