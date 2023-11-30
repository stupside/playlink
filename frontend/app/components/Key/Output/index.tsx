import { FC } from "react";

const DEFAULT_KEY = "0000";

const Output: FC<{ raw?: string }> = ({ raw = DEFAULT_KEY }) => {
  return (
    <span className="text-5xl font-bold font-mono tracking-[0.75ch] ">
      {raw.toUpperCase()}
    </span>
  );
};

export default Output;
