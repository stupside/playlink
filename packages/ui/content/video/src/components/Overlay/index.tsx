import {
  type FC,
  Fragment,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Transition } from "@headlessui/react";

import VideoOverlayContext from "src/contexts/VideoOverlayContext";

const TIMEOUT = 5000;

const Overlay: FC<PropsWithChildren> = ({ children }) => {
  const closeTimeout = useRef<number>();

  const [visible, setVisible] = useState(false);

  const hideOverlay = useCallback(() => {
    clearTimeout(closeTimeout.current);

    setVisible(false);
  }, [closeTimeout.current]);

  const showOverlay = useCallback(() => {
    clearTimeout(closeTimeout.current);

    setVisible(true);

    closeTimeout.current = setTimeout(() => {
      setVisible(false);
    }, TIMEOUT);
  }, [closeTimeout.current]);

  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document?.addEventListener("keydown", showOverlay);
    overlay.current?.addEventListener("mousemove", showOverlay);

    return () => {
      document?.removeEventListener("keydown", showOverlay);
      overlay.current?.removeEventListener("mousemove", showOverlay);
    };
  }, [overlay.current, showOverlay]);

  return (
    <div
      id="overlay"
      ref={overlay}
      className="fixed flex w-full h-full cursor-none select-none"
      onMouseMove={showOverlay}
      onMouseLeave={hideOverlay}
    >
      <VideoOverlayContext.Provider
        value={{
          visible,
          show: showOverlay,
          hide: hideOverlay,
        }}
      >
        <Transition
          appear
          as={Fragment}
          show={visible}
          unmount={false}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col flex-grow px-24 py-6 cursor-auto bg-gradient-to-t from-black via-transparent to-black">
            {children}
          </div>
        </Transition>
      </VideoOverlayContext.Provider>
    </div>
  );
};

export default Overlay;
