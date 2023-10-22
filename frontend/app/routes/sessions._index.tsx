import norigin from "@noriginmedia/norigin-spatial-navigation";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ }: ActionFunctionArgs) => {

    const response = await fetch(`${process.env.BACKEN_URL}/session`, {
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

    const { ref } = norigin.useFocusable<HTMLButtonElement>({
        onEnterPress: (element) => {
            element.click();
        }
    });

    return <>
        <div className="m-auto">
            <Form method="post">
                <button id="links" ref={ref} type="submit" className="block text-white font-bold">
                    Create a new session
                </button>
            </Form>
        </div>
    </>;
};

export default PageComponent;