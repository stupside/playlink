import { FC, HTMLProps, useMemo } from "react";

import { Link } from "@remix-run/react";
import Chrome from "./Browsers/Chrome";
import Firefox from "./Browsers/Firefox";
import Edge from "./Browsers/Edge";

type Browser = "chrome" | "firefox" | "edge";

const browsers: Record<Browser, FC<HTMLProps<HTMLImageElement>>> = {
  chrome: Chrome,
  firefox: Firefox,
  edge: Edge,
};

const Extension: FC<{ browser: Browser; url: string }> = ({ browser, url }) => {
  const Browser = useMemo(() => browsers[browser], [browser]);

  return (
    <Link to={url} className="flex gap-x-4 items-center">
      <span>
        <Browser width={48} height={48} />
      </span>
      <span className="font-bold text-lg">
        Download the <i>{browser}</i> extension
      </span>
    </Link>
  );
};

export default Extension;
