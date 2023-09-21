import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    return { m3u8: params.m3u8 as string };
};

const PageComponent = () => {

    const { m3u8 } = useLoaderData<typeof loader>();

    return <>
        {m3u8}
        <h1>HLS</h1>
    </>;
};

export default PageComponent;