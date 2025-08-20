import React from "react";

import { useTranslation } from "react-i18next";
import { clamp, shuffle } from "remeda";
import { twMerge } from "tailwind-merge";

import { Spoiler } from "~/components/spoiler";
import { useSettings } from "~/hooks/use-settings";
import {
  DEFAULT_SYMBOL_LIMIT,
  MAX_SYMBOL_LIMIT,
  MIN_SYMBOL_LIMIT,
} from "~/utils/constants";

const SettingsSection: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={twMerge("flex flex-col gap-2 rounded-md border p-2", className)}
    {...props}
  />
);

export const Settings = () => {
  const { t } = useTranslation();
  const {
    symbolLimitState: [symbolLimit, setSymbolLimit],
    hintsState: [showHints, setShownHints],
    alphabetState: [alphabet, setAlphabet],
    textState: [text, setText],
    resetText,
  } = useSettings();

  const shuffleGroups = React.useCallback<React.MouseEventHandler>(() => {
    setAlphabet((prevAlphabet) =>
      prevAlphabet
        ? {
            ...prevAlphabet,
            isCustom: true,
            groups: shuffle(prevAlphabet.groups),
          }
        : prevAlphabet,
    );
  }, [setAlphabet]);
  return (
    <Spoiler header={t("settings.title")} className="flex flex-col gap-2">
      <SettingsSection className="items-start">
        <div>{t("settings.textarea")}</div>

        <textarea
          className="w-full rounded-sm border p-2"
          rows={4}
          onChange={(e) => setText(e.currentTarget.value)}
          value={text}
        />

        <button
          onClick={resetText}
          className="cursor-pointer rounded-sm border px-2 py-1"
        >
          {t("settings.resetText")}
        </button>
      </SettingsSection>

      <SettingsSection className="flex-row items-center">
        <span>{t("settings.symbolsLimit")}</span>
        <input
          className="rounded-sm border px-2 py-1"
          type="number"
          value={symbolLimit}
          onChange={(e) => {
            const currentLimit =
              parseInt(e.currentTarget.value) || DEFAULT_SYMBOL_LIMIT;
            setSymbolLimit(
              clamp(currentLimit, {
                min: MIN_SYMBOL_LIMIT,
                max: MAX_SYMBOL_LIMIT,
              }),
            );
          }}
          min={MIN_SYMBOL_LIMIT}
          max={MAX_SYMBOL_LIMIT}
        />
      </SettingsSection>

      <SettingsSection className="flex-row items-center">
        <input
          type="checkbox"
          checked={showHints}
          onChange={(e) => setShownHints(e.currentTarget.checked)}
        />
        <span>{t("settings.showHints")}</span>
      </SettingsSection>

      {alphabet ? (
        <>
          <SettingsSection>
            {t("settings.currentLanguage", {
              language: alphabet.isCustom
                ? t("alphabet.mixed", { name: t(alphabet.nameKey) })
                : t(alphabet.nameKey),
            })}
          </SettingsSection>

          <SettingsSection className="items-start">
            <button
              className="cursor-pointer rounded-sm border px-2 py-1"
              onClick={shuffleGroups}
            >
              {t("settings.randomAlphabet")}
            </button>
          </SettingsSection>
        </>
      ) : null}
    </Spoiler>
  );
};
