import * as React from "react";
import { Alphabet, AlphabetGroup } from "../types";

type BlocksParams = {
  text: string;
  alphabet: Alphabet;
  symbolLimit: number;
};

type Block = {
  alphabetGroup: AlphabetGroup;
  text: string;
};

export const useBlocks = ({
  text,
  alphabet,
  symbolLimit,
}: BlocksParams): Block[] => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  React.useEffect(() => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g)!;
    const sentenceGroups = sentences.reduce<string[][]>(
      (blocks, sentence) => {
        const lastBlock = blocks[blocks.length - 1];
        lastBlock.push(sentence);
        const symbols = lastBlock.reduce(
          (amount, sentence) => amount + sentence.length,
          0
        );
        if (symbols >= symbolLimit) {
          blocks.push([]);
        }
        return blocks;
      },
      [[]]
    );
    setBlocks(
      sentenceGroups.map((sentences, index) => {
        let block = sentences.join("");
        const maxGroupIndex = Math.min(index, alphabet.length - 1);
        for (let i = 0; i <= maxGroupIndex; i++) {
          const alphabetGroup = alphabet[i];
          block = alphabetGroup.from.reduce(
            (block, fromElement) =>
              block.replace(new RegExp(fromElement, "gi"), alphabetGroup.to),
            block
          );
        }
        return {
          text: block,
          alphabetGroup: alphabet[index],
        };
      })
    );
  }, [text, alphabet, symbolLimit]);

  return blocks;
};
