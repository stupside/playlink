import { type FC } from "react";

import { Button } from "@playlink/ui-interactible";
import { Focusable } from "@playlink/ui-navigation";

import { useVideo } from "src/hooks";

const Display: FC<{
  features: Partial<{
    pip: boolean;
    fullscreen: boolean;
  }>;
}> = ({ features: { pip, fullscreen } }) => {
  const { useVideoDisplay } = useVideo();

  const { useVideoFullscreen, useVideoPip } = useVideoDisplay();

  const togglePip = useVideoPip();

  const { enabled, toggle: toggleFullscreen } = useVideoFullscreen();

  return (
    <>
      {fullscreen && (
        <Focusable>
          {({ ref }) => (
            <Button ref={ref} title="Fullscreen" handle={toggleFullscreen}>
              {enabled ? <>Fullscreen</> : <>Windowed</>}
            </Button>
          )}
        </Focusable>
      )}
      {pip && (
        <Focusable>
          {({ ref }) => (
            <Button ref={ref} title="Picture in Picture" handle={togglePip}>
              Picture in Picture
            </Button>
          )}
        </Focusable>
      )}
    </>
  );
};

export default Display;
