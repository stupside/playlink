import { type FC, useState } from "react";

import { Button } from "@playlink/ui-interactible";
import { Focusable } from "@playlink/ui-navigation";

import { useVideo } from "src/hooks";

import Dialog from "../../Dialog";

import Quality from "./Quality";

const Qualities: FC = () => {
  const [open, setOpen] = useState(false);

  const { useVideoQuality } = useVideo();

  const { qualities } = useVideoQuality();

  return (
    <>
      <Focusable>
        {({ ref }) => (
          <Button
            ref={ref}
            title="Quality"
            handle={() => {
              setOpen((opened) => !opened);
            }}
          >
            Quality
          </Button>
        )}
      </Focusable>
      <Dialog
        title={<>Qualities</>}
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <ul id="qualities" className="mx-1 flex gap-x-3">
          {Array.from(qualities).map(({ id, name }, index) => (
            <Quality key={index} id={id} name={name} />
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export default Qualities;
