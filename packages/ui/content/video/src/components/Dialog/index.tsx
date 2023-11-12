import {
  type FC,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
} from "react";

import { Transition, Dialog as HeadlessUiDialog } from "@headlessui/react";

import { FocusableBoundary } from "@playlink/ui-navigation";

const Dialog: FC<
  PropsWithChildren<{ open: boolean; close: () => void; title: ReactElement }>
> = ({ open, close, title, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessUiDialog open={open} onClose={close}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessUiDialog.Panel className="max-w-md transform overflow-hidden transition-all">
                <HeadlessUiDialog.Title
                  as="h3"
                  className="text-xl font-medium text-zinc-200 mb-2"
                >
                  {title}
                </HeadlessUiDialog.Title>
                <FocusableBoundary lock>
                  {({ ref }) => (
                    <div
                      ref={ref}
                      className="rounded-lg bg-zinc-800 p-5 text-zinc-400 font-medium text-lg"
                    >
                      {children}
                    </div>
                  )}
                </FocusableBoundary>
              </HeadlessUiDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUiDialog>
    </Transition>
  );
};

export default Dialog;
