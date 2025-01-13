import { defineDocumentType, makeSource } from "contentlayer2/source-files"

export const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: `**/experiences/**/*.{md,mdx}`,
  contentType: "markdown",
  fields: {
    company: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    start: {
      type: "string",
      required: true,
    },
    end: {
      type: "string",
      required: false,
    },
    image: {
      type: "string",
      required: false,
    },
    locale: {
      type: "enum",
      options: ["en", "pt-br"],
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
      default: [],
    },
  },
  // computedFields: {
  //   locale: {
  //     type: 'string',
  //     resolve: (doc) => {
  //       if (doc._raw.sourceFilePath.includes('/en/')) return 'en';
  //       if (doc._raw.sourceFilePath.includes('/pt-br/')) return 'pt-br';
  //       return 'unknown';
  //     },
  //   },
  // },
}));

export const Education = defineDocumentType(() => ({
  name: "Education",
  filePathPattern: `**/educations/**/*.{md,mdx}`,
  contentType: "markdown",
  fields: {
    institution: {
      type: "string",
      required: true,
    },
    course: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
    locale: {
      type: "enum",
      options: ["en", "pt-br"],
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Experience, Education],
})