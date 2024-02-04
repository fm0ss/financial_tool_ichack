import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalysisCard from "./_components/analysis-card";
import ChatGptCard from "./_components/chatgpt-card";
import TwitterCard from "./_components/twitterCard";

const AnalysisPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const getData = async () => {
    console.log(searchParams?.url);

    if (!searchParams?.url) {
      alert("NO SEARCH PARAMS");
      return;
    }

    const formData = new FormData();
    formData.append("url", searchParams.url as string);

    console.log(formData);

    const res = fetch("https://ichack24-cool-a495ca7b8008.herokuapp.com/", {
      method: "POST",
      headers: { "cache-control": "no-cache" },
      body: formData,
    });

    return (await res).json();
  };

  const data = await getData();

  console.log({ data });

  return (
    <div className="w-full h-screen bg-muted flex justify-center text-lg mt-8 pt-8 gap-4">
      <AnalysisCard data={data} />
      <div className="gap-4">
        <ChatGptCard data={data} />
        <TwitterCard />
      </div>
    </div>
  );
};

export default AnalysisPage;

export const AnalysisPageSkeleton = () => (
  <div className="w-full h-screen flex justify-center text-lg bg-muted mt-8 pl-5">
    <div className="w-full  h-full max-h-[800px] py-4 gap-4 flex mt-8">
      <Card className="p-4 w-[800px] h-[800px] ">
        {Array.from({ length: 4 }, (_, index) => index).map((_, i) => (
          <div key={i} className={cn("gap-2 flex flex-col", { "mt-8": i > 0 })}>
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-3/4 h-8" />
          </div>
        ))}
      </Card>

      <div className="gap-4">
        <Card className="[h-400px]">
          <div className="w-[350px] h-390px p-4">
            <Skeleton className="w-[120px] h-10 mb-8" />

            {Array.from({ length: 6 }, (_, index) => index)
              .map((_, i) => i)
              .map((i) => (
                <Skeleton className="w-full h-8 mt-3" />
              ))}
          </div>
        </Card>
        <Card className="h-[420px] mt-4">
          <div className="w-[350px] p-4">
            <Skeleton className="w-[120px] h-10 mb-8" />

            {Array.from({ length: 6 }, (_, index) => index)
              .map((_, i) => i)
              .map((i) => (
                <Skeleton className="w-full h-8 mt-3" />
              ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);
