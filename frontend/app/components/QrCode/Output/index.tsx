import { FC, PropsWithChildren } from "react";

import Refresh from "./Refresh";

const QR_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const Output: FC<{ qr?: string }> = ({ qr = QR_PLACEHOLDER }) => {
  return (
    <QrBox>
      <img
        src={qr}
        alt="Qr"
        className="flex-grow bg-white rounded-xl border-2 border-black overflow-hidden"
      />
    </QrBox>
  );
};

const QrBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex relative w-48 h-48 items-center justify-center">
      {children}
    </div>
  );
};

export default Object.assign(Output, {
  Refresh,
});
