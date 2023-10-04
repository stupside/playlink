import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const action = async ({ params }: ActionFunctionArgs) => {

    const session = params.session;

    const response = await fetch(`http://localhost:3000/session/${session}/code`, {
        method: "GET",
    });

    const { qr, code, expiry } = await response.json();

    return json({ qr, code, expiry });
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return json({ session: Number(params.session) });
};

const PageComponent = () => {

    const data = useLoaderData<typeof loader>();
    const fetcher = useFetcher<typeof action>();

    const [expiry, setExpiry] = useState<NodeJS.Timeout>();

    const [links, setLinks] = useState<Array<{ type: string, url: string }>>([]);

    const link = usePlayLinks({
        session: data.session
    });

    useEffect(() => {

        if (link) {

            setLinks((old) => [...old, link]);
        }

    }, [link, setLinks])

    useEffect(() => {

        const onTimeout = () => {

        };

        setExpiry((old) => {

            if (old) {
                old.refresh();
            }
            else {

                setInterval(() => {
                    
                }, 1000);

                return setTimeout(onTimeout, fetcher.data?.expiry * 1000);
            };

            return old;
        });

    }, [setExpiry, fetcher.data?.expiry]);

    return <div className="m-auto">
        <div className="flex justify-center items-center">
            <div>
                <img src={fetcher.data?.qr} title={fetcher.data?.code} className="w-64 h-64 rounded-xl border-2 border-black" />
            </div>
            <div className="mx-16">
                <fetcher.Form method="post" className="">
                    <button type="submit" title={"code"} className="m-5 rounded">
                        {fetcher.state === "idle"
                            ? <ArrowPathIcon className="w-6 h-6" />
                            : <ArrowPathIcon className="w-6 h-6 animate-spin" />
                        }
                    </button>
                </fetcher.Form>
            </div>
        </div>
    </div>;
}

const usePlayLinks = ({ session }: { session: number }) => {

    const [source, setSource] = useState<EventSource>();

    const [message, setMessage] = useState<{ type: string, url: string }>();

    useEffect(() => {

        if (typeof window == "undefined") return;

        const href = `http://localhost:3000/session/${session}/links`;

        setSource((old) => {

            if (href === old?.url) {

                if (old.readyState === old.OPEN) return old;
                if (old.readyState === old.CONNECTING) return old;

                old.close();
            }

            return new EventSource(href);
        });

    }, [session]);

    useEffect(() => {

        const onMessage = async (message: MessageEvent<string>) => {

            const json = JSON.parse(message.data);

            setMessage(json);
        };

        source?.addEventListener("message", (message) => {

            onMessage(message);
        });

        return () => {

            source?.removeEventListener("message", onMessage);

            source?.close();
        }

    }, [source]);

    return message;
}

export default PageComponent;