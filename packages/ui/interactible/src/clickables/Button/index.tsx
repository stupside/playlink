import { type FC, type PropsWithChildren, type RefObject } from "react";

const Button: FC<
  PropsWithChildren<{
    ref: RefObject<HTMLButtonElement>;
    title: string;
    handle: () => void;
  }>
> = ({ ref, handle, title, children }) => {
  return (
    <button
      ref={ref}
      type="button"
      title={title}
      className="flex items-center bg-zinc-700 text-zinc-200 focus:bg-zinc-200 hover:bg-zinc-200 focus:text-black hover:text-black rounded-md py-1 px-3"
      onClick={handle}
    >
      <span className="font-bold">{children}</span>
    </button>
  );
};

export default Button;
