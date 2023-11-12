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
    const sse = new EventSource(loader, { withCredentials: true });

    source.current = sse;

    return () => {
      source.current?.close();
    };
  }, [loader]);

  return (
    <SseContext.Provider
      key={loader}
      value={{
        source: source.current,
      }}
    >
      {children}
    </SseContext.Provider>
  );
};

export default Provider;
