"use client";
import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations();
  console.log(t("HomePage.title"));
  return (
    <>
      <h1>{t("HomePage.title")}</h1>
      <Hero />
    </>
  );
}
