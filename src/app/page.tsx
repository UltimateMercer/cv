"use client";
import { Hero } from "@/components/hero";
import NoiseBackground from "@/components/noise-background";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  console.log(t("title"));
  return (
    <main className="relative">
      <h1>{t("title")}</h1>
      <Hero />
      <NoiseBackground density={1} opacity={0.1} />
    </main>
  );
}
