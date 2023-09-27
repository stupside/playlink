import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo } from "react";


export const loader = async ({ params }: LoaderFunctionArgs) => {

    return { session: Number(params.session) }
};

const PageComponent = () => {

    const { session } = useLoaderData<typeof loader>();

    const source = useMemo(() => {
        return new EventSource(`http://localhost:3000/host/connect?session=${session}`);
    }, [session]);

    useEffect(() => {

        const onMessage = (message: MessageEvent) => {
            console.log(message);
        };

        source.addEventListener("message", onMessage);

        return () => {

            source.removeEventListener("message", onMessage);
        }

    }, [source]);

    return <></>;
}

export default PageComponent;