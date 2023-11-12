import { FC, useState, MouseEventHandler } from "react";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import { CheckIcon } from "@heroicons/react/24/solid";

import { useVideoQuality } from "../Contexts/hooks/useVideoQuality";

import VideoDialog from "./VideoDialog";

const VideoQuality: FC = () => {
  const [open, setOpen] = useState(false);

  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  return (
    <>
      <button
        title="quality"
        type="button"
        ref={ref}
        className="flex items-center bg-white text-black rounded-md py-1 px-3"
        onClick={() => {
          setOpen((opened) => !opened);
        }}
      >
        <span className="font-bold">Quality</span>
      </button>
      {open && (
        <VideoDialog>
          <div className="flex flex-col">
            <div className="mb-3 font-bold text-lg">Audio</div>
            <Qualities />
          </div>
        </VideoDialog>
      )}
    </>
  );
};

const Qualities = () => {
  const { qualities } = useVideoQuality();

  const { ref, focusKey } = norigin.useFocusable({
    trackChildren: true,
  });

  return (
    <norigin.FocusContext.Provider value={focusKey}>
      <ul ref={ref} id="qualities" className="mx-1">
        {Array.from(qualities).map(({ id, name }) => (
          <Quality key={id} id={id} name={name} />
        ))}
      </ul>
    </norigin.FocusContext.Provider>
  );
};

const Quality = ({ id, name }: { id: number; name: string }) => {
  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  const { quality, changeQuality } = useVideoQuality();

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const value = event.currentTarget.value;

    changeQuality(Number.parseInt(value));
  };

  return (
    <li className="flex items-center gap-3 my-1">
      <button
        ref={ref}
        className="p-2 hover:bg-slate-200 rounded-lg"
        value={id}
        onClick={onClick}
      >
        {name}
      </button>
      {id === quality && <CheckIcon className="w-4 h-4" />}
    </li>
  );
};

export default VideoQuality;
