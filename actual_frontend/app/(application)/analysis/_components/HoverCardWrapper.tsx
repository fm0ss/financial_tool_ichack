"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React, { useEffect, useState } from "react";
import { Res, Sentence } from "./analysis-card";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Link, Sparkles } from "lucide-react";

interface HoverCardWrapper {
  e: Sentence;
  i: number;
  company: string;
}

function countNewlinesAtEnd(str: string) {
  // Use a regular expression to match newline characters at the end of the string
  const match = str.match(/\n+$/);

  // If there is a match, return the length of the matched newline characters
  // Otherwise, return 0
  return match ? match[0].length : 0;
}

const isPositive = (score: number) => score > 0.9;
const isNegative = (score: number) => score < -0.7;

const HoverCardWrapper: React.FC<HoverCardWrapper> = ({ e, i, company }) => {
  const [response, setRespose] = useState<Res>({ links: [], explanation: "" });

  const handleResponse = async () => {
    const formData = new FormData();
    formData.append("name", company);
    formData.append("sentence", e.text);
    const response = fetch(
      "https://ichack24-cool-a495ca7b8008.herokuapp.com/explain",
      {
        method: "POST",
        body: formData,
      }
    )
      .then(async (res) => {
        const d = await res.json();
        console.log({ d });
        setRespose(d);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (!isPositive(e.score) && !isNegative(e.score)) return;
    handleResponse();
    console.log("yeahh");
  }, []);

  return (
    <HoverCard key={i}>
      {isPositive(e.score) || isNegative(e.score) ? (
        <HoverCardTrigger>
          <span
            className={cn(
              {
                "bg-red-600/20 hover:bg-red-600/40 cursor-default": isNegative(
                  e.score
                ),
              },
              {
                "bg-green-600/20 hover:bg-green-600/40 cursor-default":
                  isPositive(e.score),
              },
              { italic: !!response.explanation }
            )}
          >
            {e.text}
            {Array.from(
              { length: countNewlinesAtEnd(e.text) },
              (_, i) => i
            ).map((i) => (
              <br key={i} />
            ))}{" "}
          </span>{" "}
        </HoverCardTrigger>
      ) : (
        <>
          {e.text + " "}
          {Array.from(
            {
              length:
                countNewlinesAtEnd(e.text) == 1
                  ? 2
                  : countNewlinesAtEnd(e.text),
            },
            (_, i) => i
          ).map((i) => (
            <br key={i} />
          ))}
        </>
      )}
      <HoverCardContent>
        {response.explanation ? (
          <Card className="p-4">
            <CardTitle className="flex p-4">
              <Sparkles className="mr-1 text-primary" />
              More Info
            </CardTitle>
            <CardContent>{response.explanation}</CardContent>
            <CardFooter className="gap-4">
              {response.links.length > 0 && (
                <Link className="mr-2 text-primary" />
              )}
              <div className="flex flex-col text-muted-foreground underline">
                {response.links?.map((link, i) => (
                  <div className="text-xs">
                    <a href={link} key={i}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ) : (
          <>
            <Skeleton className="w-full h-8 mb-4" />
            <Skeleton className="w-full h-8 mb-4" />
            <Skeleton className="w-3/4 h-8 mb-4" />
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardWrapper;
