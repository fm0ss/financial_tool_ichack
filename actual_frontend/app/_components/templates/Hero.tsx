"use client";

import Link from "next/link";
import NavBar from "../navbar";


import { Background } from "../background/Background";
import { HeroOneButton } from "../hero/HeroOneButton";
import { Section } from "../layout/Section";
import { NavbarTwoColumns } from "../navigation/NavbarTwoColumns";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Wand } from "lucide-react";
import { useRouter } from "next/navigation";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});
const Hero = () => {
  const navigation = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.url.value);
    navigation.push(`/analysis?url=${e.target.url.value}`);
  };
  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavBar />
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <span className={cn(headingFont.className, "gap-2")}>
              {"The Advanced Financial Insights Hub for\n"}
              <span className="text-primary">Market Analysts</span>
            </span>
          }
          description="Rapid Financial Analysis and In-Depth Market Insights"
          button={
            <form
              className="flex p-16 gap-4 items-center justify-center"
              onSubmit={onSubmit}
            >
              {/* <Input className="rotating-border" /> */}
              <div className="bblock h-8 glow  w-[320px] -mt-3.5 flex relative " />

              <Input
                className="z-99 absolute bg-white w-[330px] rounded-lg h-[40px] -mr-4 mt-[2px] p-4 pr-12 focus:border-transparent border-transparent focus:outline-none outline-none ring-transparent focus:ring-transparent"
                placeholder="Enter your London Stock Exchange URL"
                name="url"
              />
              <div className="absolute -mr-[300px] text-primary">
                <Button
                  size="icon"
                  className="z-100 rounded-full bg-transparent hover:bg-transparent text-primary  hover:scale-[1.2] duration-100 ease-in-out size-7 cursor-pointer"
                  disabled={false}
                >
                  <Sparkles className="text-primary hover:transform" />
                </Button>
              </div>
            </form>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };
