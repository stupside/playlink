import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Video from "~/components/Video";
import { LinkVideoType } from "~/hooks/useLink";


export const action = async ({ params }: ActionFunctionArgs) => {
}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return json({
        url: String(params.url),
        type: params.type as LinkVideoType,
        session: Number(params.session),
    });
};

const PageComponent = () => {

    const { url, type } = useLoaderData<typeof loader>();

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <Video url={url} type={type} />
    </div>
};

export default PageComponent;