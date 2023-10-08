import { useContext } from "react";

import VideoQualityContext from "~/components/Video/Types/VideoQualityContext";

export const useVideoQuality = () => useContext(VideoQualityContext);