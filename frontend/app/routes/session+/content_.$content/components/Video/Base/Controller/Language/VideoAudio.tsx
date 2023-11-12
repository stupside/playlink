import { FC, MouseEventHandler } from "react";

import { CheckIcon } from "@heroicons/react/24/solid";

import norigin from "@noriginmedia/norigin-spatial-navigation";

import useVideoLanguage from "../../Contexts/hooks/useVideoLanguage";

const VideoAudio: FC = () => {
  const { ref, focusKey } = norigin.useFocusable({
    trackChildren: true,
  });

  const { audios } = useVideoLanguage.useVideoAudio();

  return (
    <norigin.FocusContext.Provider value={focusKey}>
      <ul ref={ref} id="audios" className="mx-1">
        {Array.from(audios).map(({ id, name }) => (
          <Audio key={id} id={id} name={name} />
        ))}
      </ul>
    </norigin.FocusContext.Provider>
  );
};

const Audio = ({ id, name }: { id: number; name: string }) => {
  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  const { audio, changeAudio } = useVideoLanguage.useVideoAudio();

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const value = event.currentTarget.value;

    changeAudio(Number.parseInt(value));
  };

  return (
    <li className="flex items-center gap-3 my-1">
      <button
        title="audio"
        id="audio"
        ref={ref}
        className="p-2 hover:bg-slate-200 rounded-lg"
        value={id}
        onClick={onClick}
      >
        {name}
      </button>
      {id === audio && <CheckIcon className="w-4 h-4" />}
    </li>
  );
};

export default VideoAudio;
