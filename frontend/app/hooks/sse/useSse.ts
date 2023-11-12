import { useContext, useEffect, useState } from "react";

import { SseContext } from "~/components/Sse/Provider";

export type SseEventMap = {
  "/device/code": { key: string; code: string };
  "/device/token": { name: string; device: number };
  "/content/create": { id: number; type: string; value: string };
};

type SseEvents = keyof SseEventMap;

const useSse = <TEvent extends SseEvents>({
  connector,
}: {
  connector?: {
    event: TEvent;
    handler: (event: SseEventMap[TEvent]) => Promise<void>;
  };
}) => {
  const { source } = useContext(SseContext);

  const [connected, setConnected] = useState<boolean>(
    source?.readyState === source?.OPEN
  );

  useEffect(() => {
    const onOpen = () => {
      console.debug("useSse", "connected", true);

      setConnected(true);
    };

    const onError = () => {
      console.debug("useSse", "connected", false);

      setConnected(false);
    };

    source?.addEventListener("open", onOpen);
    source?.addEventListener("error", onError);

    const onMessage = (message: MessageEvent<string>) => {
      const event = JSON.parse(message.data);

      console.debug("useSse", "onMessage", message.type, event);

      return connector?.handler(event);
    };

    if (connector?.event) source?.addEventListener(connector.event, onMessage);

    return () => {
      source?.removeEventListener("open", onOpen);
      source?.removeEventListener("error", onError);

      if (connector?.event)
        source?.removeEventListener(connector.event, onMessage);
    };
  }, [source, connector]);

  return {
    connected,
  };
};

export default useSse;
