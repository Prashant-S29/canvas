import type React from "react";

// icons
import { TickIcon } from "public/icons";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface WhatToExpectProps {
  trigger: React.ReactNode;
}

export const WhatToExpect: React.FC<WhatToExpectProps> = ({ trigger }) => {
  const otherPlatformFeatures = ["Only for small projects", "Works okish", "Only Manage"];

  const canvasFeatures = [
    "Free and fully open source",
    "Fully managed workspace",
    "Developer Dashboard with API access",
    "Mass Certificate Generation",
    "Certificate Verification",
    "Deployable on your Infrastructure",
    "Templates and Marketplace",
    "more..",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader className="text-left sm:text-center">
          <DialogTitle className="text-base">What to Expect from Canvas</DialogTitle>
          <DialogDescription>
            With Canvas, we aimed to provide a complete solution for all your
            online certifications.
          </DialogDescription>
        </DialogHeader>
        <div className="grid  md:grid-cols-2 gap-4 py-4">
          <div className="px-4 py-3 border rounded-lg w-full ">
            <p className="text-sm">Other Certificate Managers</p>

            <ul className="mt-5 text-xs sm:text-sm  space-y-2 text-primary/70">
              {otherPlatformFeatures.map((feature, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="text-primary/80 flex items-center gap-2"
                >
                  <TickIcon className="text-xs text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 py-3 border rounded-lg w-full  bg-sidebar">
            <p className="text-sm">Canvas</p>
            <ul className="mt-5 text-xs sm:text-sm  space-y-2 text-primary/70">
              {canvasFeatures.map((feature, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="text-primary/80 flex items-center gap-2"
                >
                  <TickIcon className="text-xs text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
