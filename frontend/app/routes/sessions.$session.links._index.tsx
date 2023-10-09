import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import Code from "~/components/Code";

import Sse from "~/components/Sse";


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

    return <div className="flex min-h-screen items-center align-middle bg-black">

        <Sse session={data.session}>

            <div className="fixed top-0 left-0">
                <div className="flex items-center m-4 gap-3">
                    <Sse.Status />
                    <Sse.Links session={data.session} />
                </div>
            </div>

            <div className="m-auto">
                <Code
                    RefreshButton={
                        <fetcher.Form method="POST">
                            <Code.Expiry
                                qr={fetcher.data?.qr}
                                code={fetcher.data?.code}
                                expiry={fetcher.data?.expiry}
                                refreshing={fetcher.state === "loading" || fetcher.state === "submitting"}
                            />
                        </fetcher.Form>
                    }
                    QrCode={
                        <Code.Qr qr={fetcher.data?.qr} code={fetcher.data?.code} />
                    }
                />
            </div>
        </Sse>
    </div>;
}

export default PageComponent;