import { useContext, useState } from "react"
import VideoControllerContext from "~/components/Video/Types/VideoControllerContext"
import { useVideo } from "./useVideo";

const useVideoController = () => useContext(VideoControllerContext);

export default useVideoController;