"use client";

import React, { useEffect, useState } from "react";
import { Data } from "./analysis-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type User = "assistant" | "user";

export type Message = {
  content: string;
  role: User;
};

interface ChatGptCardProps {
  data: Data;
}

const ChatGptCard: React.FC<ChatGptCardProps> = ({ data }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleChat();
  }, []);

  const handleChat = async () => {
    const value = data.sentences.map((s) => s.text).join(" ");

    setIsLoading(true);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({ text: value }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        console.log("here1");
        return;
      }

      const reader = res.body?.getReader();

      const decoder = new TextDecoder("utf-8");
      let finalResult = "";
      while (true) {
        const { value, done } = await reader.read();

        const t = decoder.decode(value);
        console.log(t);

        setMessage((prev) => prev + t);

        if (done) break;
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        alert("Error sending message");
        console.log({ err });
      }
    }
    setIsLoading(false);
  };

  return (
    <Card className="p-2 pb-8 h-[392px]">
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
        <ScrollArea className="w-[350px] h-[350px]">
          <CardTitle className="flex p-4">
            <Sparkles className="text-primary mr-1" /> Summary
          </CardTitle>
          <CardContent>{message}</CardContent>
        </ScrollArea>
      )}
    </Card>
  );
};

export default ChatGptCard;
