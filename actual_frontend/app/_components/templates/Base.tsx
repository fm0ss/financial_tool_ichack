import { Meta } from "../layout/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { Banner } from "./Banner";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { VerticalFeatures } from "./VerticalFeatures";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const Base = () => (
  <div className={cn("text-gray-600 antialiased")}>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
);

export { Base };
