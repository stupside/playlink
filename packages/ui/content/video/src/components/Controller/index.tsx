import { type ComponentProps, type FC, type PropsWithChildren } from "react";

import { FocusableBoundary } from "@playlink/ui-navigation";

import Display from "./Display";
import Timeline from "./Timeline";
import Qualities from "./Qualities";
import Languages from "./Languages";

import Overlay from "../Overlay";

type ControllerFeatureImplementation = FC<PropsWithChildren> | boolean;

type ControllerFeatures<
  TImplementation extends
    ControllerFeatureImplementation = FC<PropsWithChildren>,
> = Partial<{
  display: ComponentProps<typeof Display>["features"];
  timeline: ComponentProps<typeof Timeline>["features"];
  quality: Partial<{
    Provider: TImplementation;
  }>;
  language: Partial<{
    Audio: TImplementation;
    Subtitle: TImplementation;
  }>;
}>;

const Controller: FC<{
  title?: string;
  features: ControllerFeatures<FC<PropsWithChildren>>;
}> = ({
  title,
  features: {
    quality,
    language,
    display = {
      pip: true,
      fullscreen: true,
    },
    timeline = {
      play: true,
      seek: true,
    },
  },
}) => {
  return (
    <Overlay>
      <header className="flex flex-row justify-end ">
        <span>{title}</span>
      </header>
      <div className="relative flex flex-grow items-center justify-center"></div>
      <FocusableBoundary>
        {({ ref }) => (
          <footer ref={ref} id="controller" className="flex flex-col gap-y-3">
            <section className="flex items-center gap-x-8">
              <Timeline features={timeline} />
            </section>
            <section className="flex justify-center gap-x-6">
              {typeof quality?.Provider === "function" && (
                <quality.Provider>
                  <Qualities />
                </quality.Provider>
              )}
              <Languages features={language} />
              <Display features={display} />
            </section>
          </footer>
        )}
      </FocusableBoundary>
    </Overlay>
  );
};

export {
  Controller,
  type ControllerFeatures,
  type ControllerFeatureImplementation,
};

export { Display, Timeline, Languages, Qualities };
