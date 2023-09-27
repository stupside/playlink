import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {

    const formData = await request.formData();

    const session = formData.get("session");

    const response = await fetch("http://localhost:3000/host/code", {
        method: "POST",
        body: JSON.stringify({
            session
        })
    });

    const { qr, token } = await response.json();

    return json({ qr, token });
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return { session: Number(params.session) }
};

const PageComponent = () => {

    const fetcher = useFetcher();

    const data = useActionData<typeof action>();

    return <div>
        <fetcher.Form method="post">
            <button type="submit">
                {fetcher.state === "idle"
                    ? <ArrowPathIcon className="w-6 h-6 animate-spin" />
                    : <ArrowPathIcon className="w-6 h-6" />
                }
            </button>
        </fetcher.Form>
        {data && <img src={data.qr} className="w-48 h-48" />}
    </div>;
}

export default PageComponent;