import norigin from "@noriginmedia/norigin-spatial-navigation";

import useVideoFullscreen from "../../Contexts/hooks/useVideoFullscreen";

const VideoFullscreen = () => {
  const { toggle, fullscreen } = useVideoFullscreen();

  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  return (
    <button
      title="fullscreen"
      id="fullscreen"
      ref={ref}
      type="button"
      onClick={toggle}
      className="flex items-center bg-white text-black rounded-md py-1 px-3 font-bold"
    >
      {fullscreen ? <span>Fullscreen</span> : <span>Windowed</span>}
    </button>
  );
};

export default VideoFullscreen;
