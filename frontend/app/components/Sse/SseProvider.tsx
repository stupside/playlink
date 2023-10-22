import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

interface ISseContext {
    source?: EventSource,
    connected?: boolean
}

export const SseContext = createContext<ISseContext>({});

const SseProvider: FC<{ session: number, baseUrl: string } & PropsWithChildren> = ({ session, children, baseUrl }) => {

    const [source, setSource] = useState<EventSource>();

    const [connected, setConnected] = useState<boolean>();

    useEffect(() => {

        if (typeof window == "undefined") return;

        const href = `${baseUrl}/session/${session}/sse`;

        setSource((old) => {

            if (href === old?.url) {

                if (old.readyState === old.OPEN) return old;
                if (old.readyState === old.CONNECTING) return old;

                old.close();
            }

            return new EventSource(href);
        });

    }, [session, setSource, setConnected]);

    useEffect(() => {

        const onOpen = () => {
            setConnected(true);
        }

        const onError = () => {
            setConnected(source?.readyState === source?.OPEN);
        }

        source?.addEventListener("open", onOpen);
        source?.addEventListener("error", onError);

        return () => {

            source?.removeEventListener("open", onOpen);
            source?.removeEventListener("error", onError);

            source?.close();
        }

    }, [source, setConnected]);

    return <SseContext.Provider value={{
        source,
        connected
    }}>
        {children}
    </SseContext.Provider>
};

export default SseProvider;