import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    return { m3u8: params.m3u8 as string };
};

const PageComponent = () => {

    const { m3u8 } = useLoaderData<typeof loader>();

    return <>
        <h1>HLS Player</h1>
        {m3u8}
    </>;
};

export default PageComponent;