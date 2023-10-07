import { useState, useEffect } from "react";

const Code = ({ qr, code, expiry, action }: { qr: string, code: string, expiry: number, action: JSX.Element }) => {

    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {

        setRemaining(expiry);

        const interval = setInterval(() => {

            setRemaining((old) => {

                return old - 1;
            });
        }, 1000);

        const timeout = setTimeout(() => {

            clearInterval(interval);
        }, expiry * 1000);

        return () => {

            clearInterval(interval);
            clearTimeout(timeout);
        }

    }, [setRemaining, expiry, code]);

    return <div>
        <div className="flex justify-end my-3 mx-2">
            <div className="flex items-center ">
                <div className="mx-3">
                    {remaining > 0
                        ? <p className="text-white font-bold">{remaining}s</p>
                        : <p className="text-white font-bold">Expired</p>
                    }
                </div>
                <div>
                    {action}
                </div>
            </div>
        </div>
        <div className="rounded-xl border-2 border-black overflow-hidden">
            <img src={qr} title={"QR Code"} alt={code} className="w-48 h-48 bg-white" />
        </div>
    </div>
};

export default Code;