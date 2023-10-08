import { useState, useEffect } from "react";
import { LinkType } from "./useLink";

const usePlayLinks = ({ session }: { session: number }) => {

    const [source, setSource] = useState<EventSource>();

    const [connected, setConnected] = useState<boolean>();

    const [message, setMessage] = useState<{ id: number, type: LinkType, url: string }>();

    useEffect(() => {

        if (typeof window == "undefined") return;

        const href = `http://localhost:3000/session/${session}/links`;

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
        }

    }, [source, setConnected]);

    useEffect(() => {

        const onMessage = async (message: MessageEvent<string>) => {

            const json = JSON.parse(message.data);

            setMessage(json);
        };

        source?.addEventListener("message", (message) => {

            onMessage(message);
        });

        return () => {

            source?.removeEventListener("message", onMessage);

            source?.close();
        }

    }, [source]);

    return { link: message, connected };
};

export default usePlayLinks;