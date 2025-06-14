"use client";

import Link from "next/link";
import type React from "react";

// components
import { ThemeToggler } from "~/components/common";
import { useMounted } from "~/hooks";

export const Header: React.FC = () => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between container left-1/2 -translate-x-1/2 p-8">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <svg
          width="30"
          height="30"
          viewBox="0 0 430 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Canvas</title>
          <path
            d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
            fill="var(--stroke-color)"
          />
        </svg>
        Canvas
      </Link>

      <ThemeToggler />
    </header>
  );
};
