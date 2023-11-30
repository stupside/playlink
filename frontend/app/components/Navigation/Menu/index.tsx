import { FC, ReactNode } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import Entry from "./Entry";

type MenuProps<TItem> = {
  children?: Array<ReactNode>;
  items: Array<TItem>;
  Entry: FC<TItem>;
};

const Menu = <TItem extends unknown>({
  children,
  items,
  Entry,
}: MenuProps<TItem>) => {
  const { ref, focusKey } = norigin.useFocusable({
    trackChildren: true,
  });

  return (
    <norigin.FocusContext.Provider value={focusKey}>
      <ul ref={ref}>
        {items.map((item, index) => {
          return <li key={index}>{Entry(item)}</li>;
        })}
        {children?.map((child, index) => {
          return <li key={index}>{child}</li>;
        })}
      </ul>
    </norigin.FocusContext.Provider>
  );
};

export default Object.assign(Menu, {
  Entry,
});
