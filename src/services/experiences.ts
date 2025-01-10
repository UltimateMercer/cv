import { compareDesc } from "date-fns";

import { allExperiences } from "contentlayer/generated";

interface LocaleProps {
  locale?: "en" | "pt-br" | string;
}

export const getExperiences = ({ locale = "en" }: LocaleProps = {}) =>
  allExperiences
    .filter((experience) => experience.locale === locale)
    .sort((a, b) => compareDesc(new Date(a.start), new Date(b.start)));

// export function getExperiences({locale = "en"}: LocaleProps = {}) {
//   return allExperiences.sort(
//     (
//       a: { start: string | number | Date },
//       b: { start: string | number | Date }
//     ) => {
//       return compareDesc(new Date(a.start), new Date(b.start));
//     }
//   );
// }
