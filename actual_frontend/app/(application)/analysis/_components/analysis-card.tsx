"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";
import HoverCardWrapper from "./HoverCardWrapper";

interface AnalysisCardProps {
  data: Data;
}

const isPositive = (score: number) => score > 0.9;
const isNegative = (score: number) => score < -0.7;

export type Sentence = {
  score: number;
  text: string;
};

export type Data = {
  company: string;
  sentences: Sentence[];
};

export type Res = {
  links: string[];
  explanation: string;
};

type HoverCardData = {
  links: string[];
  explanation: string;
};

const AnalysisCard: React.FC<AnalysisCardProps> = ({ data }) => {
  // const [hoverCardData, setHoverCardData] = useState<HoverCardData[]>();
  // const [isLoading, setIsLoading] = useState(true);

  // const yeah = async () => {
  //   const promises = data.sentences.map((s) => makePostRequest(s));
  //   const results = await Promise.all(promises);
  //   setHoverCardData(results as HoverCardData[]);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   yeah();
  // }, []);

  // const makePostRequest = async (element: Sentence) => {
  //   const r: Res = {
  //     links: [],
  //     explanation: "",
  //   };

  //   if (!isPositive(element.score) && !isNegative(element.score)) {
  //     return r;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.company);
  //     formData.append("sentence", element.text);
  //     const response = await fetch(
  //       "https://ichack24-cool-a495ca7b8008.herokuapp.com/explain",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     // Check if the request was successful
  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch: ${response.status} ${response.statusText}`
  //       );
  //     }

  //     // Parse and return the response data
  //     return (await response.json()) as Res;
  //   } catch (error) {
  //     console.log(error);
  //     return r;
  //   }
  // };

  return (
    <Card className="p-0 py-2 max-w-[800px] h-full max-h-[800px] flex justify-center items-center">
      <CardContent>
        <ScrollArea className="h-[740px] w-[760px] overflow-y-auto px-2">
          {data.sentences.map((e: any, i: number) => (
            <HoverCardWrapper key={i} e={e} i={i} company={data.company} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
