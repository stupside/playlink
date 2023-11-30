import { useContext } from "react";

import VideoQualityContext from "../VideoQualityContext";

export const useVideoQuality = () => useContext(VideoQualityContext);
