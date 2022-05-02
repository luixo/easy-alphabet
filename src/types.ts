import { TFuncKey } from "react-i18next";

export type AlphabetGroup = {
  from: string[];
  to: string[];
};

export type AlphabetTransform = "ru-ka" | "ka-ru";

export type AlphabetDescription = {
  transform: AlphabetTransform;
  groups: AlphabetGroup[];
  nameKey: TFuncKey;
  isCustom: boolean;
};
