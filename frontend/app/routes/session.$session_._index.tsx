import { PlayIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import usePlayLinks from "~/hooks/usePlayLinks";
import { LinkVideoType } from "~/hooks/useLink";
import CodeExpiry from "~/components/Code/CodeExpiry";
import CodeQr from "~/components/Code/CodeQr";


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

    const fetcher = useFetcher<typeof action>();
    const data = useLoaderData<typeof loader>();

    const navigate = useNavigate();

    const { link, connected } = usePlayLinks({
        session: data.session
    });

    const playLink = useCallback(() => {

        if (link) {

            if (link.type as LinkVideoType) {
                navigate(`/session/${data.session}/link/${link.id}`);
            }
        }

    }, [link, navigate]);

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <div className="fixed top-0 left-0">
            <div className="flex items-center m-4 gap-3">
                <div className="flex m-2">
                    {connected === undefined
                        ? <span className="w-3 h-3 bg-orange-600 rounded-full"></span>
                        : connected
                            ? <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                            : <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                    }
                </div>
                {
                    link && <>
                        <div className="flex">
                            <span className="text-white font-bold">{link?.url.substring(0, 50)}</span>
                        </div>
                        <button type="button" title="play" className="block" onClick={playLink}>
                            <span><PlayIcon className="w-6 h-6 text-white" /></span>
                        </button>
                    </>
                }
            </div>
        </div>
        <div className="m-auto">

            <div className="flex justify-between items-center mx-3">
                <div className="flex gap-3 items-center">

                </div>
                <div className="flex gap-3 items-center">
                    <fetcher.Form method="POST">
                        <CodeExpiry
                            qr={fetcher.data?.qr}
                            code={fetcher.data?.code}
                            expiry={fetcher.data?.expiry}
                            refreshing={fetcher.state === "loading" || fetcher.state === "submitting"}
                        />
                    </fetcher.Form>
                </div>
            </div>

            <div className="my-3">
                <CodeQr qr={fetcher.data?.qr} code={fetcher.data?.code} />
            </div>
        </div>
        <Outlet />
    </div>;
}

export default PageComponent;