import { FC, PropsWithChildren, createContext, useEffect, useRef } from "react";

interface ISseContext {
  source?: EventSource;
}

export const SseContext = createContext<ISseContext>({});

const Provider: FC<{ loader: string } & PropsWithChildren> = ({
  loader,
  children,
}) => {
  const source = useRef<EventSource>();

  useEffect(() => {
    if (source.current?.readyState === undefined) {
      console.debug("Sse", "event source loading", loader);

      source.current = new EventSource(loader, { withCredentials: true });
    }

    return () => {
      source.current?.close();
    };
  }, []);

  return (
    <SseContext.Provider
      value={{
        source: source.current,
      }}
    >
      {children}
    </SseContext.Provider>
  );
};

export default Provider;
