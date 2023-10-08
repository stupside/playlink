import { useContext, useState, useMemo, useEffect } from "react";
import { SseContext } from "~/components/Sse/SseProvider";

export type LinkVideoType = "mp4" | "m3u8";

export type LinkType = LinkVideoType;

export interface Link { id: number, type: LinkType, url: string };

export const useSse = () => {

    const { source, connected } = useContext(SseContext);

    const [messages, setMessages] = useState<Array<Link>>([]);

    const message = useMemo(() => messages.at(0), [messages]);

    useEffect(() => {

        const onMessage = async (message: MessageEvent<string>) => {

            const json = JSON.parse(message.data);

            setMessages((old) => ([...old, json]))
        };

        source?.addEventListener("message", (message) => {

            onMessage(message);
        });

        return () => {

            source?.removeEventListener("message", onMessage);
        };

    }, [source, setMessages]);

    return { message, messages, connected };
};