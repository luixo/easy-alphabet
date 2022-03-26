import useCookie from "react-use-cookie";
import { DEFAULT_LANGUAGE, Language } from "../i18n";

export const useLanguage = (): [Language, (language: Language) => void] => {
  const [lang, setLang] = useCookie("i18nextLng", DEFAULT_LANGUAGE);
  return [lang as Language, setLang];
};
