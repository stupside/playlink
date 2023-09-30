import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ClientOnly from "~/components/ClientOnly";

export const action = async ({ params }: ActionFunctionArgs) => {

    const session = params.session;

    const response = await fetch(`http://localhost:3000/session/${session}/code`, {
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
        console.log({ url });
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

        <ClientOnly>
            <Stream session={data.session} handleStream={handleStream} />
            {messages.map((message) => {
                return <span key={message.url}>{message.url}</span>;
            })}
        </ClientOnly>
    </div>;
}

const Stream = ({ session, handleStream }: { session: number, handleStream: (type: string, url: string) => Promise<void> }) => {

    const source = useMemo(() => {

        return new EventSource(`http://localhost:3000/session/${session}/links`);

    }, [session]);

    useEffect(() => {

        const onMessage = async (message: MessageEvent<{ type: string, url: string }>) => {

            console.log(message);

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