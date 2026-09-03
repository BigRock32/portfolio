export const PROJECT_CATEGORIES = [
   { value: "webflow", label: "Webflow" },
   { value: "frontend", label: "Frontend" },
] as const;

export type ProjectCategory =
   (typeof PROJECT_CATEGORIES)[number]["value"];