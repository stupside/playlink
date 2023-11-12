import type { PlasmoCSConfig } from "plasmo";
import type { FC } from "react";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

const Content: FC = () => {
  return <div>content</div>;
};

export default Content;
