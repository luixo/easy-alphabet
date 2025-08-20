import type React from "react";

import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { keys } from "remeda";

import { Page } from "~/components/page";
import { useLanguage } from "~/hooks/use-language";
import {
  baseLanguage,
  defaultNamespace,
  getBackendModule,
  languages,
} from "~/utils/i18n";

const i18nInstance = i18n
  .createInstance({
    fallbackLng: baseLanguage,
    defaultNS: defaultNamespace,
    ns: [defaultNamespace],
    supportedLngs: keys(languages),
    interpolation: {
      // React doesn't need to escape values
      escapeValue: false,
    },
    partialBundledLanguages: true,
    lng: "en",
  })
  .use(initReactI18next)
  .use(getBackendModule());

export const App: React.FC = () => {
  const [language] = useLanguage();
  if (!i18nInstance.isInitializing && !i18nInstance.isInitialized) {
    void i18nInstance.init({ lng: language });
  }
  return (
    <I18nextProvider i18n={i18nInstance}>
      <Page />
    </I18nextProvider>
  );
};
