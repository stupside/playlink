import { useContext } from "react";

import VideoControllerContext from "../VideoControllerContext";

const useVideoController = () => useContext(VideoControllerContext);

export default useVideoController;
