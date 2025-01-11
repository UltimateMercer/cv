"use client";
import { ExperienceCard } from "@/components/experience-card";
import { Hero } from "@/components/hero";
import NoiseBackground from "@/components/noise-background";
import { getExperiences } from "@/services/experiences";
import { useAppStore } from "@/store/useAppStore";
import { allExperiences } from "contentlayer/generated";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations();
  const { locale } = useAppStore();

  const experiences = React.useMemo(() => getExperiences({ locale }), [locale]);
  console.log(experiences);
  console.log(allExperiences);
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl relative z-10 space-y-5 print:space-y-5">
        <Hero />
        <article className="flex min-h-0 flex-col gap-y-1">
          <h2 className="text-2xl font-bold">{t("About.title")}</h2>
          <p className="text-pretty text-base !font-mono">
            Atualmente sou Desenvolvedor Front-end, tendo experiência
            trabalhando com React e Vue.JS. Em projetos pessoais venho
            praticando com frameworks back-end, como Express e NestJS, com o
            intuito de me tornar um Desenvolvedor FullStack.
          </p>
        </article>
        <article className="flex min-h-0 flex-col gap-y-2">
          <h2 className="text-2xl font-bold">{t("Experiences.title")}</h2>
          {experiences.map((experience) => (
            <ExperienceCard experience={experience} key={experience.company} />
          ))}
        </article>
      </section>
      <NoiseBackground density={1} opacity={0.1} />
    </main>
  );
}
