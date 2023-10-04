import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import usePlayLinks from "~/hooks/usePlayLinks";

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

export default PageComponent;