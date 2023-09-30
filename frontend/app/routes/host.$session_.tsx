import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";

export const action = async ({ params }: ActionFunctionArgs) => {

    const session = params.session;

    const response = await fetch(`http://localhost:3000/host/${session}/code`, {
        method: "GET",
    });

    const { qr, token } = await response.json();

    return json({ qr, token });
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return json({ session: Number(params.session) });
};

const PageComponent = () => {

    const data = useLoaderData<typeof loader>();
    const fetcher = useFetcher<typeof action>();

    const [messages, setMessages] = useState<Array<{ type: string, url: string }>>([]);

    const handleStream = useCallback(async (type: string, url: string) => {
        setMessages((old) => [...old, { type, url }]);
    }, [setMessages]);

    return <div className="flex flex-col w-full h-full">

        <div className="relative m-auto">

            <fetcher.Form method="post" className="absolute left-0 top-0">

                <button type="submit" className="m-5">

                    {fetcher.state === "idle"
                        ? <ArrowPathIcon className="w-6 h-6" />
                        : <ArrowPathIcon className="w-6 h-6 animate-spin" />
                    }
                </button>
            </fetcher.Form>

            <img src={fetcher.data?.qr} className="w-48 h-48" />
        </div>

        <>
            <button disabled={fetcher.data == undefined} type="button" onClick={async () => {
                await fetch("http://localhost:3000/host/feed", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: fetcher.data?.token,
                        m3u8: "test.m3u8"
                    })
                })
            }}>
                Simulate Feed
            </button>

            {typeof window == "undefined" ? null : <Stream session={data.session} handleStream={handleStream} />}

            {messages.map((message) => <span>{message.url}</span>)}
        </>
    </div>;
}

const Stream = ({ session, handleStream }: { session: number, handleStream: (type: string, url: string) => Promise<void> }) => {

    const source = useMemo(() => {

        return new EventSource(`http://localhost:3000/host/${session}/stream`);
    }, [session]);

    useEffect(() => {

        const onMessage = async (message: MessageEvent<{ type: string, url: string }>) => {
            await handleStream(message.data.type, message.data.url);
        };

        source.addEventListener("message", onMessage);

        return () => {

            source.removeEventListener("message", onMessage);
        }

    }, [source, handleStream]);

    return <></>;
}

export default PageComponent;