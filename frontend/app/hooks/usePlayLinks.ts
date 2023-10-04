import { useState, useEffect } from "react";
import { LinkType } from "./useLink";

const usePlayLinks = ({ session }: { session: number }) => {

    const [source, setSource] = useState<EventSource>();

    const [message, setMessage] = useState<{ type: LinkType, url: string }>();

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

    }, [session]);

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

    return message;
};

export default usePlayLinks;