import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Video from "~/components/Video";
import { LinkVideoType } from "~/hooks/useLink";


export const action = async () => {

}

export const loader = async ({ params }: LoaderFunctionArgs) => {

    return json({
        session: Number(params.session),
        url: params.url as string,
        type: params.type as LinkVideoType,
    });
};

const PageComponent = () => {

    const { url, type } = useLoaderData<typeof loader>();

    return <div className="flex min-h-screen items-center align-middle bg-black">
        <Video url={url} type={type} />
    </div>;
};

export default PageComponent;