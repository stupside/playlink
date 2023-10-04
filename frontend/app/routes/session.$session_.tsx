import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Code from "~/components/Code";
import Links from "~/components/Links";
import { LinkType } from "~/hooks/useLink";
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

    return <div className="m-auto">

        <div className="flex justify-center items-center">
            <Code qr={fetcher.data?.qr} code={fetcher.data?.code} expiry={fetcher.data?.expiry} />
            <div className="mx-16">
                <fetcher.Form method="post" className="">
                    <button type="submit" title={"code"} className="m-5 rounded">
                        {fetcher.state === "idle"
                            ? <ArrowPathIcon className="w-6 h-6" />
                            : <ArrowPathIcon className="w-6 h-6 animate-spin" />
                        }
                    </button>
                </fetcher.Form>
                <Links session={data.session} />
            </div>
        </div>
    </div>;
}

export default PageComponent;