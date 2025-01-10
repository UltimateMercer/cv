"use client";
import { Hero } from "@/components/hero";
import NoiseBackground from "@/components/noise-background";
import { getExperiences } from "@/services/experiences";
import { useAppStore } from "@/store/useAppStore";
import { allExperiences } from "contentlayer/generated";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations("HomePage");
  const { locale } = useAppStore();

  const experiences = React.useMemo(() => getExperiences({ locale }), [locale]);
  console.log(experiences);
  console.log(allExperiences);
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <h1>{t("title")}</h1>
      <Hero />
      {experiences.map((experience) => (
        <div key={experience.company}>
          <h2>{experience.company}</h2>
          <p>{experience.role}</p>
        </div>
      ))}
      <NoiseBackground density={1} opacity={0.1} />
    </main>
  );
}
