import { cn } from "@/lib/utils";
import { AppConfig } from "@/utils/AppConfig";
import { CandlestickChart } from "lucide-react";

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? "44" : "32";
  const fontStyle = props.xl
    ? "font-semibold text-3xl"
    : "font-semibold text-xl";

  return (
    <div className={"flex flex-col items-center  font-semibold "}>
      <CandlestickChart className="size-10 text-primary" />
      <h1 className="text-primary">GENFD</h1>
    </div>
  );
};

export { Logo };
