import { type FC } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { Focusable } from "@playlink/ui-navigation";

const Refresh: FC<{
  disabled: boolean;
}> = ({ disabled }) => {
  return (
    <Focusable>
      {({ ref }) => (
        <button
          ref={ref}
          type="submit"
          title="refresh"
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
            }
          }}
          className="block rounded"
        >
          {disabled ? (
            <ArrowPathIcon className="w-8 h-8 stroke-[3px] animate-spin" />
          ) : (
            <ArrowPathIcon className="w-8 h-8 stroke-[3px]" />
          )}
        </button>
      )}
    </Focusable>
  );
};

export default Refresh;
