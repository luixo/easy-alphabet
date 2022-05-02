import * as React from "react";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import { useLanguage } from "../hooks/use-language";
import { Language } from "../i18n";
import { styled } from "../styles";

const MAPPING = {
  ru: "RU",
  en: "GB",
  ka: "GE",
} as const;

const DEMAPPING = Object.entries(MAPPING).reduce<Record<Country, Language>>(
  (acc, [key, value]) => {
    acc[value] = key as Language;
    return acc;
  },
  {} as Record<Country, Language>
);

type Country = typeof MAPPING[keyof typeof MAPPING];

const LABELS: Record<Country, string> = {
  RU: "RU",
  GB: "EN",
  GE: "KA",
};

const countries: Country[] = Object.values(MAPPING);

const FlagSelector = styled(ReactFlagsSelect, {
  background: "white",
  padding: 5,
});

export const LanguageSelector = () => {
  const [language, setLanguage] = useLanguage();
  const { i18n } = useTranslation();
  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  return (
    <FlagSelector
      countries={countries}
      customLabels={LABELS}
      selected={MAPPING[language]}
      onSelect={(countryCode) => setLanguage(DEMAPPING[countryCode as Country])}
    />
  );
};
