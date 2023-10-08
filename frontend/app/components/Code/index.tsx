import { FC } from "react"
import CodeQr from "./CodeQr";
import CodeExpiry from "./CodeExpiry";

const Code: FC<{ RefreshButton: JSX.Element, QrCode: JSX.Element }> = ({ RefreshButton, QrCode }) => {
    return <div>
        <div className="flex justify-end mr-3">
            {RefreshButton}
        </div>

        <div className="my-3">
            {QrCode}
        </div>
    </div>
};

export default Object.assign(Code, {
    Qr: CodeQr,
    Expiry: CodeExpiry
});