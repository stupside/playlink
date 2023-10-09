import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ }: ActionFunctionArgs) => {

    const response = await fetch("http://localhost:3000/session", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    });

    const { session } = await response.json();

    return redirect(`/sessions/${session}/links`);
}

const PageComponent = () => {

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <div className="m-auto">
            <Form method="post">
                <button id="links" type="submit" className="block text-white font-bold">
                    Session
                </button>
            </Form>
        </div>
    </div>;
};

export default PageComponent;