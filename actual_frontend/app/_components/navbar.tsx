import { Logo } from "@/app/_components/templates/Logo";
import { Button } from "@/components/ui/button";
import { BarChart2, Home, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full flex px-4 py-2 items-center justify-center  -mb-5 ">
      <div className="flex justify-between max-w-6xl flex-1 ">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex items-center">
          <Link className="px-2" href="/#features">
            Features
          </Link>
          <Link
            className="px-2"
            href="https://gitlab.doc.ic.ac.uk/gt922/financial-tool-ichack24"
          >
            GitLab
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
