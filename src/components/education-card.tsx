"use client";
import Image from "next/image";
export interface EducationCardProps {
  education: {
    institution: string;
    course: string;
    status: string;
    image?: string | null | undefined;
    locale: "en" | "pt-br" | string;
  };
  withImage?: boolean;
}

export const EducationCard = ({
  education,
  withImage = false,
}: EducationCardProps) => {
  return (
    <div className="flex items-center gap-2">
      {withImage && (
        <Image
          src={education.image || ""}
          width={80}
          height={80}
          className="w-20 h-20 rounded"
          alt={education.institution}
        />
      )}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{education.institution}</h3>
        <p className="text-sm">{education.course}</p>
        <p className="text-sm">{education.status}</p>
      </div>
    </div>
  );
};
