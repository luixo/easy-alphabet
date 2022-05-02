import * as React from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_ALPHABETS } from "../constants";
import { styled } from "../styles";
import { AlphabetDescription } from "../types";

const Wrapper = styled("div");

const Line = styled("li", {
  cursor: "pointer",
  padding: 4,

  "&:hover": {
    textDecoration: "underline",
  },

  "& + &": {
    marginTop: 4,
  },
});

type Props = {
  onSelect: (description: AlphabetDescription) => void;
};

export const AlphabetPicker: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <h2>{t("languagePicker.selectLanguage")}</h2>
      <ul>
        {Object.entries(DEFAULT_ALPHABETS).map(([key, alphabet]) => {
          return (
            <Line key={key} onClick={() => props.onSelect(alphabet)}>
              {t(alphabet.nameKey)}
            </Line>
          );
        })}
      </ul>
    </Wrapper>
  );
};
