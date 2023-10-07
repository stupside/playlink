import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import Code from "~/components/Code";
import usePlayLinks from "~/hooks/usePlayLinks";
import { LinkVideoType } from "~/hooks/useLink";


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

    const link = usePlayLinks({
        session: data.session
    });

    const [accept, setAccept] = useState(false);

    useEffect(() => {

        setAccept(false);

    }, [link, setAccept]);

    const acceptLink = useCallback(() => {

        if (link) {

            setAccept(true);

            if (link.type as LinkVideoType) {
                navigate(`/session/${data.session}/video/${link.type}/${link.url}`);
            }
        }

    }, [link, setAccept, navigate]);

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <div className="m-auto">

            <Code qr={fetcher.data?.qr} code={fetcher.data?.code} expiry={fetcher.data?.expiry} action={
                <fetcher.Form method="post" className="">
                    <button type="submit" title="code" className="block rounded">
                        {fetcher.state === "idle"
                            ? <ArrowPathIcon className="w-6 h-6 text-white" />
                            : <ArrowPathIcon className="w-6 h-6 text-white animate-spin" />
                        }
                    </button>
                </fetcher.Form>
            } />
        </div>
    </div>;
}

export default PageComponent;