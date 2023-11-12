import {
  FC,
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useRef,
} from "react";

interface IVideoContext {
  url: string;
  video: RefObject<HTMLVideoElement>;
  player: RefObject<HTMLDivElement>;
}

const VideoContext = createContext<IVideoContext>({} as IVideoContext);

export const useVideo = () => useContext(VideoContext);

const VideoProvider: FC<PropsWithChildren<{ url: string }>> = ({
  url,
  children,
}) => {
  const video = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLDivElement>(null);

  return (
    <div id="player" ref={player} className="relative flex flex-grow">
      <video
        src={url}
        className="cursor-none mx-auto"
        ref={video}
      />
      <VideoContext.Provider
        value={{
          url,
          video,
          player,
        }}
      >
        {children}
      </VideoContext.Provider>
    </div>
  );
};

export default VideoProvider;
