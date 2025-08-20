import React from "react";

import { useLocalStorage } from "usehooks-ts";

import { DEFAULT_SYMBOL_LIMIT, DEFAULT_TEXTS } from "~/utils/constants";
import type { AlphabetDescription } from "~/utils/types";

export const useSettings = () => {
  const alphabetState = useLocalStorage<AlphabetDescription | null>(
    "alphabet",
    null,
  );
  const textState = useLocalStorage(
    "text",
    alphabetState[0] ? DEFAULT_TEXTS[alphabetState[0].transform] : "",
  );
  const resetAlphabet = React.useCallback(() => {
    alphabetState[1](null);
    textState[1]("");
  }, [alphabetState, textState]);
  const resetText = React.useCallback(() => {
    if (!alphabetState[0]) {
      return;
    }
    textState[1](DEFAULT_TEXTS[alphabetState[0].transform]);
  }, [alphabetState, textState]);
  const selectAlphabet = React.useCallback(
    (alphabet: AlphabetDescription) => {
      alphabetState[1](alphabet);
      if (!textState[0]) {
        textState[1](DEFAULT_TEXTS[alphabet.transform]);
      }
    },
    [alphabetState, textState],
  );
  return {
    symbolLimitState: useLocalStorage(
      "easy-alphabet-symbol-limit",
      DEFAULT_SYMBOL_LIMIT,
    ),
    hintsState: useLocalStorage("easy-alphabet-show-hints", true),
    alphabetState,
    resetAlphabet,
    textState,
    resetText,
    selectAlphabet,
  };
};
