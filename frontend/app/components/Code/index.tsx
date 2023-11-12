import { FC } from "react";

const DEFAULT_CODE = "0000";

const Code: FC<{ code?: string }> = ({ code = DEFAULT_CODE }) => {
  return (
    <span className="text-5xl font-extrabold slashed-zero tabular-nums tracking-[0.75ch] ">
      {code}
    </span>
  );
};

export default Code;
