import { SignalIcon } from "@heroicons/react/24/solid";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {

    const response = await fetch("http://localhost:3000/host", {
        method: "POST",
        body: JSON.stringify({})
    });

    const { session } = await response.json();

    return json({ session });
}

export const loader = async ({ }: LoaderFunctionArgs) => {

    return {};
};

const PageComponent = () => {

    const fetcher = useFetcher();

    const data = useActionData<typeof action>();

    return <div>
        {data && <span>session={data.session}</span>}
        <fetcher.Form method="post">
            <button type="submit">
                {fetcher.state === "idle"
                    ? <SignalIcon className="w-6 h-6 animate-spin" />
                    : <SignalIcon className="w-6 h-6" />
                }
            </button>
        </fetcher.Form>
        <Outlet />
    </div>;
};

export default PageComponent;