import { useContext } from "react";

import VideoSubtitleContext from "~/components/Video/Types/VideoSubtitleContext";
import VideoAudioContext from "~/components/Video/Types/VideoAudioContext";

const useVideoAudio = () => useContext(VideoAudioContext);
const useVideoSubtitle = () => useContext(VideoSubtitleContext);

export default { useVideoSubtitle, useVideoAudio };