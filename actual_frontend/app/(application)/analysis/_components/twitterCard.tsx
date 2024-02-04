import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import React from "react";
import { Twitter } from "lucide-react";
import { Data } from "./analysis-card";
import Link from "next/link";

interface TwitterCardProps {
  data?: Data;
}

const TwitterCard: React.FC<TwitterCardProps> = async ({ data }) => {
  const formData = new FormData();
  const pageData = data?.sentences.map((s) => s.text).join(" ");

  formData.append("page", pageData ?? "");

  const res = await fetch(
    "https://ichack24-cool-a495ca7b8008.herokuapp.com/tweets",
    {
      method: "POST",
      body: formData,
    }
  );

  const tweetsData = await res.json();

  return (
    <Card className="p-2 pb-8 h-[390px] mt-4">
      {false ? (
        <div className="w-[350px] p-4">
          <Skeleton className="w-[120px] h-10 mb-8" />

          {Array.from({ length: 6 }, (_, index) => index)
            .map((_, i) => i)
            .map((i) => (
              <Skeleton className="w-full h-8 mt-3" />
            ))}
        </div>
      ) : (
        <>
          <CardTitle className="flex p-4">
            <Twitter className="text-primary mr-1" /> Tweets
          </CardTitle>
          <ScrollArea className="w-[300px] h-[350px] whitespace-nowrap">
            <ScrollBar orientation="horizontal" />

            <CardContent className="flex flex-col gap-4">
              {tweetsData?.tweets.map((t: string, i: number) => (
                <Link href={t} className="text-muted-foreground">
                  {t}
                </Link>
              ))}
            </CardContent>
          </ScrollArea>
        </>
      )}
    </Card>
  );
};

export default TwitterCard;
