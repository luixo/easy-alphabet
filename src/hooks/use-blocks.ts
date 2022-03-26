import * as React from "react";
import { Alphabet, AlphabetGroup } from "../types";

type BlocksParams = {
  text: string;
  alphabet: Alphabet;
  symbolLimit: number;
};

type Block = {
  alphabetGroup?: AlphabetGroup;
  text: string;
};

export const useBlocks = ({
  text,
  alphabet,
  symbolLimit,
}: BlocksParams): Block[] => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  React.useEffect(() => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
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
          block = alphabetGroup.from.reduce((block, fromElement) => {
            let counter = 0;
            return block.replace(
              new RegExp(fromElement, "gi"),
              (element, index, block) => {
                if (alphabetGroup.transformPredicators) {
                  if (
                    alphabetGroup.transformPredicators.some(
                      (predicator) => !predicator(element, index, block)
                    )
                  ) {
                    return element;
                  }
                }
                return alphabetGroup.to[counter++ % alphabetGroup.to.length];
              }
            );
          }, block);
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
