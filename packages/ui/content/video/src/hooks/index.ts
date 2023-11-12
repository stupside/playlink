import { useContext } from "react";

import { VideoContext } from "src/contexts";

import VideoAudioContext from "src/contexts/VideoAudioContext";
import VideoOverlayContext from "src/contexts/VideoOverlayContext";
import VideoQualityContext from "src/contexts/VideoQualityContext";
import VideoSubtitleContext from "src/contexts/VideoSubtitleContext";

import useVideoVolume from "./useVideoVolume";
import useVideoDisplay from "./useVideoDisplay";
import useVideoTimeline from "./useVideoTimeline";

export const useVideo = () => {
  const context = useContext(VideoContext);

  const useVideoAudio = () => useContext(VideoAudioContext);
  const useVideoOverlay = () => useContext(VideoOverlayContext);
  const useVideoQuality = () => useContext(VideoQualityContext);
  const useVideoSubtitle = () => useContext(VideoSubtitleContext);

  return Object.assign(context, {
    useVideoAudio,
    useVideoOverlay,
    useVideoQuality,
    useVideoSubtitle,
    useVideoDisplay: () => {
      return useVideoDisplay({
        video: context.video,
        player: context.player,
      });
    },
    useVideoTimeline: () => {
      return useVideoTimeline({
        video: context.video,
      });
    },
    useVideoVolume: () => {
      return useVideoVolume({
        video: context.video,
      });
    },
  });
};
