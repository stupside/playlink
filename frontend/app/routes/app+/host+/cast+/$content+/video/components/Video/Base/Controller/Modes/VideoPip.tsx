import norigin from "@noriginmedia/norigin-spatial-navigation";

import useVideoPip from "../../Contexts/hooks/useVideoPip";

const VideoPip = () => {
  const toggle = useVideoPip();

  const { ref } = norigin.useFocusable<HTMLButtonElement>({
    onEnterPress: (element) => {
      element.click();
    },
  });

  return (
    <button
      title="pip"
      id="pip"
      type="button"
      ref={ref}
      onClick={toggle}
      className="flex items-center bg-white text-black rounded-md py-1 px-3 font-bold"
    >
      <span>Pip</span>
    </button>
  );
};

export default VideoPip;
