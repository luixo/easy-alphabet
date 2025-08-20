import React from "react";

import { useTranslation } from "react-i18next";

import { useSettings } from "~/hooks/use-settings";
import type { AlphabetDescription, AlphabetGroup } from "~/utils/types";

type Block = {
  alphabetGroup?: AlphabetGroup;
  text: string;
};

export const Blocks: React.FC<{ alphabet: AlphabetDescription }> = ({
  alphabet,
}) => {
  const { t } = useTranslation();
  const {
    resetText,
    resetAlphabet,
    textState: [text],
    symbolLimitState: [symbolLimit],
    hintsState: [showHints],
  } = useSettings();
  const blocks = React.useMemo<Block[]>(() => {
    if (!alphabet) {
      return [{ text }];
    }
    const { groups } = alphabet;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const sentenceGroups = sentences.reduce<string[][]>(
      (blocks, sentence) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastBlock = blocks[blocks.length - 1]!;
        lastBlock.push(sentence);
        const symbols = lastBlock.reduce(
          (amount, sentence) => amount + sentence.length,
          0,
        );
        if (symbols >= symbolLimit) {
          blocks.push([]);
        }
        return blocks;
      },
      [[]],
    );
    return sentenceGroups.map((sentences, index) => {
      let block = sentences.join("");
      const maxGroupIndex = Math.min(index, groups.length - 1);
      for (let i = 0; i <= maxGroupIndex; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const alphabetGroup = groups[i]!;
        block = alphabetGroup.from.reduce((block, fromElement) => {
          let counter = 0;
          return block.replace(
            new RegExp(fromElement, "gi"),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            alphabetGroup.to[counter++ % alphabetGroup.to.length]!,
          );
        }, block);
      }
      return {
        text: block,
        alphabetGroup: groups[index],
      };
    });
  }, [text, symbolLimit, alphabet]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className="cursor-pointer rounded-sm border px-2 py-1"
          onClick={resetAlphabet}
        >
          {t("settings.resetAlphabet")}
        </button>

        <button
          className="cursor-pointer rounded-sm border px-2 py-1"
          onClick={resetText}
        >
          {t("settings.resetText")}
        </button>
      </div>

      <div>
        {blocks.map((block, index) => (
          <React.Fragment key={index}>
            <div>
              {showHints && block.alphabetGroup ? (
                <p className="sticky top-0 bg-white p-1">
                  {`${block.alphabetGroup.from.join(
                    ", ",
                  )} → ${block.alphabetGroup.to.join(", ")}`}
                </p>
              ) : null}
              <p className="whitespace-pre-wrap">{block.text}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
