import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useMemo } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {

    const formData = await request.formData();

    const session = formData.get("session");

    const response = await fetch(`http://localhost:3000/host/code?session=${session}`, {
        method: "GET"
    });

    const { qr, token } = await response.json();

    return json({ qr, token });
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return { session: Number(params.session) }
};

const PageComponent = () => {

    const data = useLoaderData<typeof loader>();
    const fetcher = useFetcher<typeof action>();

    const handleStream = async (type: string, url: string) => {
        console.log({
            type,
            url
        });
    }

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

        <Suspense fallback={<></>}><Stream session={data.session} handleStream={handleStream} /></Suspense>
    </div>;
}

const Stream = ({ session, handleStream }: { session: number, handleStream: (type: string, url: string) => Promise<void> }) => {

    const source = useMemo(() => {

        return new EventSource(`http://localhost:3000/host/stream?session=${session}`);
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