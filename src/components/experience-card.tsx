"use client";
import { useAppStore } from "@/store/useAppStore";
import { FormatMonthYear } from "./date-format";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";

export interface ExperienceCardProps {
  experience: {
    company: string;
    role: string;
    description?: string;
    start: string;
    end?: string;
    tags: string[];
  };
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { locale } = useAppStore();
  const t = useTranslations("Experiences");

  return (
    <Card className="!border-none !shadow-none bg-transparent">
      <CardHeader className="!pt-0 !px-0 !pb-0">
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex text-xl items-center justify-center gap-x-1 font-semibold leading-none">
            {experience.company}
          </h3>
          <div className="text-sm font-mono text-gray-500 capitalize">
            {FormatMonthYear({ date: experience.start, locale })}
            {experience.end
              ? ` - ${FormatMonthYear({ date: experience.end, locale })}`
              : ` - ${t("inProgress")}`}
          </div>
        </div>

        <h4 className="text-base leading-none mt-0">{experience.role}</h4>
      </CardHeader>
      <CardContent className="!px-0 !pb-2 mt-1">
        {experience.description && (
          <p className="text-sm mb-1">{experience.description}</p>
        )}

        <div className="flex flex-wrap gap-1">
          {experience.tags.length > 0 &&
            experience.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant={"outline"}
                className="rounded-md print:bg-secondary"
              >
                {tag}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
