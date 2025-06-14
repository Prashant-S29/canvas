"use client";

import type React from "next";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// icons
import { SocialIcons, StarIcon } from "public/icons";

// components
import { Button } from "~/components/ui/button";
import { WhatToExpect } from "../WhatToExpect";

interface Stargazer {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

const fetchStargazers = async (): Promise<Stargazer[]> => {
  const res = await fetch(
    "https://api.github.com/repos/prashant-s29/canvas/stargazers",
  );
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export const Stargazers: React.FC = () => {
  const {
    data: stargazers,
    isLoading,
    isError,
    error,
  } = useQuery<Stargazer[], Error>({
    queryKey: ["stargazers"],
    queryFn: fetchStargazers,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false, // Do not refetch on window focus
  });

  if (isError) {
    console.error("Failed to fetch stargazers:", error.message);
  }

  const formatCount = (n: number | undefined) => {
    if (n === undefined) return "0";
    return n > 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col sm:flex-row  justify-center items-center gap-x-5 gap-y-2 ">
        <Button
          variant="secondary"
          disabled={isLoading}
          size="lg"
          asChild
          className="border"
        >
          <Link href="https://github.com/Prashant-S29/canvas" target="_blank">
            <SocialIcons.GitHubIcon className="h-5 w-5" />
            Stars on GitHub
            <StarIcon className="h-5 w-5" />
            {formatCount(stargazers?.length)}
          </Link>
        </Button>

        <WhatToExpect
          trigger={
            <Button variant="outline" size="lg">
              What to expect?
            </Button>
          }
        />
      </div>

      <p className="text-xs text-primary/70">
        Star Canvas on GitHub to show your support
      </p>
    </div>
  );
};
