import {
  useState,
  useRef,
  useCallback,
  FC,
  useEffect,
  PropsWithChildren,
} from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import VideoControllerContext from "../Contexts/VideoControllerContext";

import { useVideo } from "../../VideoProvider";

import VideoPause from "./VideoPause";
import VideoQuality from "./VideoQuality";
import VideoTimeline from "./VideoTimeline";
import VideoVolume from "./VideoVolume";

import VideoLanguage from "./Language";

import VideoModes from "./Modes";

const TIMEOUT = 5000;

type FeatureImplementation = FC<PropsWithChildren> | boolean;

export type VideoControllerFeatures<
  TImplementation extends FeatureImplementation = FC<PropsWithChildren>
> = Partial<{
  play: boolean;
  timeline: boolean;
  fullscreen: boolean;
  pip: boolean;
  volume: boolean;
  providers: Partial<{
    QualityProvider: TImplementation;
    LanguageProvider: Partial<{
      AudioProvider: TImplementation;
      SubtitleProvider: TImplementation;
    }>;
  }>;
}>;

const VideoController: FC<
  {
    title?: string;
    features: VideoControllerFeatures<FC<PropsWithChildren>>;
  } & PropsWithChildren
> = ({
  title,
  features: {
    play = true,
    timeline = true,
    fullscreen = true,
    pip = true,
    volume = true,
    providers,
  },
  children,
}) => {
  const { video } = useVideo();

  const { ref: overlay, focusKey: overlayKey } =
    norigin.useFocusable<HTMLDivElement>({
      trackChildren: true,
    });

  const { ref: controller, focusKey: controllerKey } =
    norigin.useFocusable<HTMLDivElement>({
      trackChildren: true,
    });

  const [visible, setVisible] = useState(false);

  const closeTimeout = useRef<NodeJS.Timeout>();

  const closeController = useCallback(() => {
    clearTimeout(closeTimeout.current);

    setVisible(false);
  }, [setVisible, closeTimeout.current]);

  const openController = useCallback(() => {
    clearTimeout(closeTimeout.current);

    setVisible(true);

    closeTimeout.current = setTimeout(() => {
      setVisible(false);
    }, TIMEOUT);
  }, [setVisible, closeTimeout.current]);

  useEffect(() => {
    const onMouseMove = () => {
      openController();
    };

    video.current?.addEventListener("mousemove", onMouseMove);

    return () => {
      video.current?.removeEventListener("mousemove", onMouseMove);
    };
  }, [video, openController]);

  return (
    <>
      <norigin.FocusContext.Provider value={controllerKey}>
        <div
          id="controls"
          ref={controller}
          className="absolute flex flex-col w-full h-full bg-gradient-to-t from-black via-transparent to-black cursor-auto select-none px-24 py-6"
          onMouseMove={openController}
          onMouseLeave={closeController}
          style={{
            visibility: visible === false ? "hidden" : "visible",
          }}
        >
          <VideoControllerContext.Provider
            value={{
              overlay,
              visible,
              controller,
              open: openController,
              close: closeController,
            }}
          >
            <div className="flex flex-row justify-end ">
              <span>{title}</span>
            </div>
            <div className="flex flex-grow">{children}</div>
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-8">
                {play && <VideoPause />}
                {timeline && (
                  <div className="flex-grow">
                    <VideoTimeline />
                  </div>
                )}
              </div>
              <div className="flex flex-grow justify-center gap-x-6">
                {typeof providers?.QualityProvider === "function" && (
                  <providers.QualityProvider>
                    <VideoQuality />
                  </providers.QualityProvider>
                )}
                {providers?.LanguageProvider && (
                  <VideoLanguage
                    AudioProvider={
                      typeof providers.LanguageProvider.AudioProvider ===
                      "function"
                        ? providers.LanguageProvider.AudioProvider
                        : undefined
                    }
                    SubtitleProvider={
                      typeof providers.LanguageProvider.SubtitleProvider ===
                      "function"
                        ? providers.LanguageProvider.SubtitleProvider
                        : undefined
                    }
                  />
                )}
                {pip && <VideoModes.Pip />}
                {fullscreen && <VideoModes.Fullscreen />}
              </div>
            </div>
          </VideoControllerContext.Provider>
        </div>
      </norigin.FocusContext.Provider>
      <norigin.FocusContext.Provider value={overlayKey}>
        <div ref={overlay} id="overlay" className="absolute z-auto"></div>
      </norigin.FocusContext.Provider>
    </>
  );
};

export default Object.assign(VideoController, {
  Mode: VideoModes,
  Pause: VideoPause,
  Volume: VideoVolume,
  Quality: VideoQuality,
  Timeline: VideoTimeline,
  Language: VideoLanguage,
});
