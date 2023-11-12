import { type FC, useMemo, useState } from "react";

import { Button } from "@playlink/ui-interactible";
import { Focusable } from "@playlink/ui-navigation";

import { type ControllerFeatures } from "..";

import Dialog from "../../Dialog";

import Audios from "./Audios";
import Subtitles from "./Subtitles";

const Languages: FC<{
  features: ControllerFeatures["language"];
}> = ({ features }) => {
  const [open, setOpen] = useState(false);

  const AudioProvider = useMemo(
    () => typeof features?.Audio === "function" && features.Audio,
    [features?.Audio],
  );

  const SubtitleProvider = useMemo(
    () => typeof features?.Subtitle === "function" && features.Subtitle,
    [features?.Subtitle],
  );

  if ((AudioProvider && SubtitleProvider) == false) return null;

  return (
    <>
      <Focusable>
        {({ ref }) => (
          <Button
            ref={ref}
            title="Language"
            handle={() => {
              setOpen((opened) => !opened);
            }}
          >
            {AudioProvider ? "Audio" : undefined}
            {AudioProvider && SubtitleProvider ? " and " : undefined}
            {SubtitleProvider ? "Subtitles" : undefined}
          </Button>
        )}
      </Focusable>
      <Dialog
        title={<>Language</>}
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-row gap-x-3">
          {AudioProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Audios</div>
              <AudioProvider>
                <Audios />
              </AudioProvider>
            </div>
          )}
          {SubtitleProvider && (
            <div className="flex flex-col">
              <div className="mb-3 font-bold text-lg">Subtitles</div>
              <SubtitleProvider>
                <Subtitles />
              </SubtitleProvider>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Object.assign(Languages, {
  Audios: Audios,
  Subtitles: Subtitles,
});
