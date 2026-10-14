import { useLocalStorage } from "usehooks-ts";

import { baseLanguage } from "~/utils/i18n";
import type { Language } from "~/utils/i18n";

export const useLanguage = () =>
	useLocalStorage<Language>("easy-alphabet-language", baseLanguage);
