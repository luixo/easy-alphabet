import { useLocalStorage } from "usehooks-ts";

import { type Language, baseLanguage } from "~/utils/i18n";

export const useLanguage = () =>
  useLocalStorage<Language>("easy-alphabet-language", baseLanguage);
