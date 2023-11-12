import { FC } from "react";

import useSse from "~/hooks/sse/useSse";

const ProviderStatus: FC = () => {
  const { connected } = useSse({});

  return (
    <div className="flex m-2 gap-5 items-center">
      {connected ? (
        <>
          <Online />
          <span className="font-bold">Connected</span>
        </>
      ) : (
        <>
          <Offline />
          <span className="font-bold">Disconnected</span>
        </>
      )}
    </div>
  );
};

const Online = () => (
  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
);
const Offline = () => <span className="w-3 h-3 bg-red-600 rounded-full"></span>;

export default ProviderStatus;
