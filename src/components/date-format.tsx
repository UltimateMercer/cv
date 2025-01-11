import type { DateProps } from "@/types/interfaces";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

const FormatDate = ({ date, locale = "en" }: DateProps) => {
  return format(new Date(date), "dd MMM yyyy", {
    locale: locale === "en" ? enUS : ptBR,
  });
};

const FormatFullDate = ({ date, locale = "en" }: DateProps) => {
  const localePattern =
    locale === "en" ? "MMMM dd yyyy" : "dd 'de' MMMM 'de' yyyy";
  return format(new Date(date), localePattern, {
    locale: locale === "en" ? enUS : ptBR,
  });
};

const FormatFullTimeStamp = ({ date, locale = "en" }: DateProps) => {
  const localePattern =
    locale === "en"
      ? "MMMM dd yyyy', at' H:mm"
      : "dd 'de' MMMM 'de' yyyy', às' H:mm";

  return format(new Date(date), localePattern, {
    locale: locale === "en" ? enUS : ptBR,
  });
};

const FormatMonthYear = ({ date, locale = "en" }: DateProps) => {
  return format(new Date(date), "MMM yyyy", {
    locale: locale === "en" ? enUS : ptBR,
  });
};

const BeautifyDate = ({ date, locale = "en" }: DateProps) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", {
    locale: locale === "en" ? enUS : ptBR,
  });
};

export {
  FormatDate,
  FormatFullDate,
  FormatFullTimeStamp,
  FormatMonthYear,
  BeautifyDate,
};
