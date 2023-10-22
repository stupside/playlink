import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Video from "~/components/Video";
import { LinkType } from "~/hooks/sse/useSse";

export const action = async ({ params }: ActionFunctionArgs) => {
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    const response = await fetch(`${process.env.BACKEN_URL}/session/${params.session}/link/${params.link}`, {
        method: "GET"
    });

    const { url, type } = await response.json();

    return json({
        url,
        type: type as LinkType,
    });
};

const PageComponent = () => {

    const { url, type } = useLoaderData<typeof loader>();

    return <div className="flex flex-grow items-center align-middle bg-black">
        <Video url={url} type={type} />
    </div>
};

export default PageComponent;