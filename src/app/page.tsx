"use client";
import { ExperienceCard } from "@/components/experience-card";
import { Hero } from "@/components/hero";
import NoiseBackground from "@/components/noise-background";
import { Badge } from "@/components/ui/badge";
import { getExperiences } from "@/services/experiences";
import { getEducation } from "@/services/education";
import { skills } from "@/services/skills";
import { useAppStore } from "@/store/useAppStore";
import { useTranslations } from "next-intl";
import React from "react";
import { EducationCard } from "@/components/education-card";

export default function Home() {
  const t = useTranslations();
  const { locale } = useAppStore();

  const experiences = React.useMemo(() => getExperiences({ locale }), [locale]);
  const educations = React.useMemo(() => getEducation({ locale }), [locale]);

  return (
    <>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-3xl relative z-10 space-y-5 print:space-y-5">
          <Hero />
          <article className="flex min-h-0 flex-col gap-y-1">
            <h2 className="text-2xl font-bold">{t("About.title")}</h2>
            <p className="text-pretty text-base !font-mono text-justify print:text-left">
              {t("About.text")}
            </p>
          </article>
          <article className="flex min-h-0 flex-col gap-y-2">
            <h2 className="text-2xl font-bold">{t("Experiences.title")}</h2>
            {experiences.map((experience, index) => (
              <ExperienceCard
                experience={experience}
                key={`${experience.company}-${index}`}
              />
            ))}
          </article>
          <article className="flex min-h-0 flex-col gap-y-2">
            <h2 className="text-2xl font-bold">{t("Skills.title")}</h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <Badge
                  key={`${skill}-${index}`}
                  variant="outline"
                  className="mb-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </article>
          <article className="flex min-h-0 flex-col gap-y-2">
            <h2 className="text-2xl font-bold">{t("Education.title")}</h2>
            {educations.map((education, index) => (
              <EducationCard
                education={education}
                key={`${education.institution}-${index}`}
                withImage
              />
            ))}
          </article>
        </section>
        <NoiseBackground density={0.8} opacity={0.075} />
      </main>
    </>
  );
}
