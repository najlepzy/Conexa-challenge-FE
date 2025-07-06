export const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];