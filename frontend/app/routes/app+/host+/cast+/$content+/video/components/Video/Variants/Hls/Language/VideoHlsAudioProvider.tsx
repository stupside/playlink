import {
  FC,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import Hls from "hls.js";

import VideoAudioContext from "../../../Base/Contexts/VideoAudioContext";

import { useVideoHls } from "..";

const VideoHlsAudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hls } = useVideoHls();

  const [audio, setAudio] = useState<number>(0);
  const [audios, setAudios] = useState<
    ReadonlySet<{ id: number; name: string }>
  >(new Set());

  useLayoutEffect(() => {
    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      const map = data.audioTracks?.map((audio) => ({
        id: audio.id,
        name: audio.name,
      }));

      setAudios(new Set(map));
    });

    hls.on(Hls.Events.AUDIO_TRACK_LOADED, (_, data) => {
      setAudio(data.id);
    });

    return () => {
      hls.off(Hls.Events.MANIFEST_PARSED);
      hls.off(Hls.Events.AUDIO_TRACK_LOADED);
    };
  }, [hls, hls]);

  const changeAudio = useCallback(
    (audio: number) => {
      const index = Array.from(audios).findIndex(({ id }) => id === audio);

      hls.audioTrack = index;
    },
    [audios]
  );

  return (
    <VideoAudioContext.Provider
      value={{
        audio,
        audios,
        changeAudio,
      }}
    >
      {children}
    </VideoAudioContext.Provider>
  );
};

export default VideoHlsAudioProvider;
