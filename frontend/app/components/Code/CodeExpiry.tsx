import { ArrowPathIcon } from "@heroicons/react/24/solid";
import norigin from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, useState } from "react";

const CodeExpiry = ({ code, expiry, refreshing }: { qr: string, code: string, expiry: number, refreshing: boolean }) => {

    const [remaining, setRemaining] = useState<number>(0);

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

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

    return <div className="flex gap-3 items-center">
        <div>
            {remaining > 0
                ? <p className="text-white font-bold">{remaining}s</p>
                : <p className="text-white font-bold">Expired</p>
            }
        </div>
        <div>
            <button type="submit" ref={ref} title="code" className="block rounded">
                {refreshing
                    ? <ArrowPathIcon className="w-6 h-6 text-white animate-spin" />
                    : <ArrowPathIcon className="w-6 h-6 text-white" />
                }
            </button>
        </div>
    </div>
};

export default CodeExpiry;