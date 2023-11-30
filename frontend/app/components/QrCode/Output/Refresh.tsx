import { FC, PropsWithChildren } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Refresh: FC<{
  refreshing: boolean;
  Form: FC<PropsWithChildren>;
}> = ({ refreshing, Form }) => {
  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  return (
    <Form>
      <button type="submit" ref={ref} title="qr" className="block rounded">
        {refreshing ? (
          <ArrowPathIcon className="w-6 h-6 animate-spin" />
        ) : (
          <ArrowPathIcon className="w-6 h-6" />
        )}
      </button>
    </Form>
  );
};

export default Refresh;
