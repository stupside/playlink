import { FC, PropsWithChildren, useState } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import VideoPortal from "../VideoDialog";

import VideoSubtitle from "./VideoSubtitle";
import VideoAudio from "./VideoAudio";

const VideoLanguage: FC<{
  AudioProvider?: FC<PropsWithChildren>;
  SubtitleProvider?: FC<PropsWithChildren>;
}> = ({ AudioProvider, SubtitleProvider }) => {
  const [open, setOpen] = useState(false);

  const { ref } = norigin.useFocusable();

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="flex items-center bg-white text-black rounded-md py-1 px-3"
        onClick={() => {
          setOpen((opened) => !opened);
        }}
      >
        <span className="font-bold">
          {AudioProvider ? "Audio" : undefined}
          {AudioProvider && SubtitleProvider ? " and " : undefined}
          {SubtitleProvider ? "Subtitles" : undefined}
        </span>
      </button>
      {open && (
        <VideoPortal>
          {AudioProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Audio</div>
              <AudioProvider>
                <VideoAudio />
              </AudioProvider>
            </div>
          )}

          {SubtitleProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Subtitle</div>
              <SubtitleProvider>
                <VideoSubtitle />
              </SubtitleProvider>
            </div>
          )}
        </VideoPortal>
      )}
    </>
  );
};

export default Object.assign(VideoLanguage, {
  Audio: VideoAudio,
  Subtitle: VideoAudio,
});
