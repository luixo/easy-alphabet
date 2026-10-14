import { createInstance } from "i18next";
import type React from "react";
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

const i18nInstance = createInstance({
	defaultNS: defaultNamespace,
	fallbackLng: baseLanguage,
	interpolation: {
		// React doesn't need to escape values
		escapeValue: false,
	},
	lng: "en",
	ns: [defaultNamespace],
	partialBundledLanguages: true,
	supportedLngs: keys(languages),
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
