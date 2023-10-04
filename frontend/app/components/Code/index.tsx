import { useState, useEffect } from "react";

const Code = ({ qr, code, expiry }: { qr: string, code: string, expiry: number }) => {

    const [expiryTimeout, setExpiryTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {

        const onTimeout = () => {

            console.debug("Code expired");
        };

        setExpiryTimeout((old) => {

            if (old) {

                old.refresh();
            }
            else {

                return setTimeout(onTimeout, expiry * 1000);
            };

            return old;
        });

    }, [setExpiryTimeout, expiry]);

    return <div>
        <img src={qr} title={code} className="w-64 h-64 rounded-xl border-2 border-black" />
    </div>
};

export default Code;