"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

const Navbar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backgrop-filter]:bg-background/60 print:hidden">
      <div className="flex h-16 justify-between items-center px-4 w-">
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <div className="inline-flex mr-4">
            <Image
              src="/images/ultimate-logo-red.svg"
              className="!max-w-none mx-auto w-[56px] h-[56px] hidden dark:block"
              width="56"
              height="56"
              alt="Ultimate Mercer Logo"
            />

            <Image
              src="/images/ultimate-logo-dark.svg"
              className="!max-w-none mx-auto w-[56px] h-[56px] block dark:hidden"
              width="56"
              height="56"
              alt="Ultimate Mercer Logo"
            />
          </div>
        </nav>

        <div className="ml-auto flex gap-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
