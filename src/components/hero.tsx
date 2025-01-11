"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useTranslations } from "next-intl";
import { Globe } from "@phosphor-icons/react";
import { socials } from "@/services/socials";
import { Button } from "./ui/button";
import { ariaLabel } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

export const Hero = () => {
  const t = useTranslations("Me");
  const { locale } = useAppStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-1.5 font-sans">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter">
          Julian Silva da Cunha
        </h1>
        <p className="max-w-md text-pretty text-xl">{t("role")}</p>
        <div className="max-w-md items-center text-pretty font-mono">
          <span className="inline-flex gap-x-1.5 align-baseline leading-none">
            <Globe size={16} />
            {t("location")}
          </span>
        </div>
        <div className="flex print:flex-col gap-x-1 font-mono text-sm !mt-0.5">
          {socials.map((social) =>
            social.link === "" ? null : (
              <div key={social.name}>
                <Button
                  className="print:hidden"
                  variant="outline"
                  size={"icon"}
                  asChild
                >
                  <a
                    href={
                      social.name === "Email"
                        ? `mailto:${social.link}`
                        : social.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel(locale, social.name)}
                  >
                    <social.icon className="!size-6" />
                  </a>
                </Button>
                <a
                  href={
                    social.name === "Email"
                      ? `mailto:${social.link}`
                      : social.link
                  }
                  className="hidden print:flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel(locale, social.name)}
                >
                  <social.icon size={24} className="mr-1" />
                  {social.link}
                </a>
              </div>
            )
          )}
        </div>
      </div>
      <Avatar className="size-32 rounded-lg">
        <AvatarImage
          src="/images/me.jpeg"
          alt="Julian Silva da Cunha"
          className="object-cover"
        />
        <AvatarFallback className={"!rounded-lg font-bold text-xl"}>
          JSC
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
