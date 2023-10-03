import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

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

    const [links, setLinks] = useState<Array<{ type: string, url: string }>>([]);

    const link = usePlayLinks({
        session: data.session
    });

    useEffect(() => {

        if (link) {

            setLinks((old) => [...old, link]);
        }

    }, [link, setLinks])

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

            <img src={fetcher.data?.qr} className="w-64 h-64 rounded-xl border-2 border-black" />
        </div>


        {links.map((message, index) => {
            return <span key={index}>{message.type} {message.url}</span>;
        })}
    </div>;
}

const usePlayLinks = ({ session }: { session: number }) => {

    const [source, setSource] = useState<EventSource>();

    const [message, setMessage] = useState<{ type: string, url: string }>();

    useEffect(() => {

        if (typeof window == "undefined") return undefined;

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