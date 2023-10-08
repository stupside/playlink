import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Video from "~/components/Video";
import { LinkType } from "~/hooks/useLink";


export const action = async ({ params }: ActionFunctionArgs) => {
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    const response = await fetch(`/session/${params.session}/link/${params.link}`);

    const { url, type } = await response.json();

    return json({
        url,
        type: type as LinkType,
    });
};

const PageComponent = () => {

    const { url, type } = useLoaderData<typeof loader>();

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <Video url={url} type={type} />
    </div>
};

export default PageComponent;