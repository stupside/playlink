import { FC, SVGProps } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

export type EntryProps = {
  title: string;
  handle: () => Promise<void>;
  Icon: FC<Omit<SVGProps<SVGSVGElement>, "ref">>;
};

const Entry: FC<EntryProps> = ({ title, handle, Icon }) => {
  const { ref, focused } = norigin.useFocusable<HTMLDivElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  return (
    <div ref={ref} onClick={handle} className="flex gap-8 justify-between">
      <span className="font-bold whitespace-nowrap text-lg">
        {title.substring(0, 25)}
      </span>
      <button
        type="button"
        title={title}
        className="block"
        style={{
          visibility: focused ? "visible" : "hidden",
        }}
      >
        <span>
          <Icon className="w-6 h-6" />
        </span>
      </button>
    </div>
  );
};

export default Entry;
