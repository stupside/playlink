import { useEffect, type FC, type RefObject } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

const FocusableBoundary: FC<{
  lock?: boolean;
  focus?: boolean;
  focusable?: boolean;
  children: FC<{ ref: RefObject<any> }>;
}> = ({ focus, focusable = true, lock, children }) => {
  const { ref, focusKey, focusSelf } = norigin.useFocusable({
    focusable,
    trackChildren: true,
    isFocusBoundary: focusable && lock,
    extraProps: {
      lock,
    },
  });

  useEffect(() => {
    if (focus) {
      focusSelf();
    }
  }, [focusSelf, focus]);

  return (
    <norigin.FocusContext.Provider value={focusKey}>
      {children({ ref })}
    </norigin.FocusContext.Provider>
  );
};

export default FocusableBoundary;
