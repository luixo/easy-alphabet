import type React from "react";

import { useTranslation } from "react-i18next";
import { entries } from "remeda";

import { DEFAULT_ALPHABETS } from "~/utils/constants";
import type { AlphabetDescription } from "~/utils/types";

type Props = {
  onSelect: (description: AlphabetDescription) => void;
};

export const AlphabetPicker: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">
        {t("languagePicker.selectLanguage")}
      </h2>
      <ul className="flex flex-col gap-2">
        {entries(DEFAULT_ALPHABETS).map(([key, alphabet]) => (
          <li
            className="cursor-pointer rounded-md border px-1 py-2 hover:underline"
            key={key}
            onClick={() => props.onSelect(alphabet)}
          >
            {t(alphabet.nameKey)}
          </li>
        ))}
      </ul>
    </div>
  );
};
