import { useContext } from "react";

import VideoAudioContext from "../VideoAudioContext";
import VideoSubtitleContext from "../VideoSubtitleContext";

const useVideoAudio = () => useContext(VideoAudioContext);
const useVideoSubtitle = () => useContext(VideoSubtitleContext);

export default { useVideoSubtitle, useVideoAudio };
