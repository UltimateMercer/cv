import { compareDesc } from "date-fns";
import { allEducation } from "contentlayer/generated";

interface LocaleProps {
  locale?: "en" | "pt-br" | string;
}

export const getEducation = ({ locale = "en" }: LocaleProps = {}) =>
  allEducation.filter((education) => education.locale === locale);
