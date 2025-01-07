"use client";

import * as React from "react";
import { Check, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/useAppStore";

export function LanguageSwitcher() {
  const { setLanguage, language } = useAppStore();

  const handleLanguageChange = (language: "en" | "pt-br") => {
    setLanguage(language);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]  transition-all " />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          English
          <Check
            className={`ml-2 h-[1.2rem] w-[1.2rem] ${
              language === "en" ? "block" : "hidden"
            }`}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("pt-br")}>
          Portuguese
          <Check
            className={`ml-2 h-[1.2rem] w-[1.2rem] ${
              language === "pt-br" ? "block" : "hidden"
            }`}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
