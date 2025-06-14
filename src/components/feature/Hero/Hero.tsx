import type React from "react";

// components
import { Stargazers } from "../Stargazers";

export const Hero: React.FC = async () => {
  return (
    <div className="relative flex-col  flex h-screen w-full items-center font-satoshi p-5 sm:p-8 justify-center">
      <p className="px-5 py-2 rounded-full flex  text-xs gap-2  border items-center font-medium bg-muted">
        Beta Launching Soon
      </p>
      <h1 className="text-center text-[28px] sm:text-[32px] md:text-[36px] font-clash-grotesk xl:text-[50px] font-medium  leading-none mt-5">
        An easy way to <span className="font-clash-grotesk">manage</span>
      </h1>
      <h1 className="text-center text-[28px] sm:text-[32px] md:text-[36px] xl:text-[50px] font-medium font-clash-grotesk  leading-none">
        online certificates
      </h1>
      <p className="mt-2 text-center text-primary/70 font-clash-grotesk  ">
        Introducing Canvas - A fully managed certificate generator.
      </p>
      <section className="mt-8">
        <Stargazers />
      </section>
    </div>
  );
};
