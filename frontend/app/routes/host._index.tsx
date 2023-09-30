import { SignalIcon } from "@heroicons/react/24/solid";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {

    const response = await fetch("http://localhost:3000/host", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    });

    const { session } = await response.json();

    return redirect(`/host/${session}`);
}

const PageComponent = () => {

    return <div>
        <Form method="post">
            <button type="submit">
                <SignalIcon className="w-6 h-6" />
            </button>
        </Form>
    </div>;
};

export default PageComponent;