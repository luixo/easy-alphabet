import type React from "react";

import { useTranslation } from "react-i18next";

import { AlphabetPicker } from "~/components/alphabet-picker";
import { Blocks } from "~/components/blocks";
import { Footer } from "~/components/footer";
import { LanguageSelector } from "~/components/language-selector";
import { Settings } from "~/components/settings";
import { useSettings } from "~/hooks/use-settings";

export const Page: React.FC = () => {
  const {
    selectAlphabet,
    alphabetState: [alphabet],
  } = useSettings();

  const { t } = useTranslation();

  return (
    <>
      <LanguageSelector className="fixed top-2 right-2 z-10" />
      <main className="flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold">{t("meta.title")}</h1>
        <Settings />
        {alphabet ? (
          <Blocks alphabet={alphabet} />
        ) : (
          <AlphabetPicker onSelect={selectAlphabet} />
        )}
      </main>
      <Footer />
    </>
  );
};
