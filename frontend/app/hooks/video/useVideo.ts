import { useContext } from "react";
import { VideoContext } from "~/components/Video/VideoProvider";

export const useVideo = () => useContext(VideoContext);
