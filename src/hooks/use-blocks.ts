import * as React from "react";
import { AlphabetGroup } from "../types";

type BlocksParams = {
  text: string;
  groups: AlphabetGroup[] | undefined;
  symbolLimit: number;
};

type Block = {
  alphabetGroup?: AlphabetGroup;
  text: string;
};

export const useBlocks = ({
  text,
  groups,
  symbolLimit,
}: BlocksParams): Block[] => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  React.useEffect(() => {
    if (!groups) {
      setBlocks([{ text }]);
      return;
    }
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
        const maxGroupIndex = Math.min(index, groups.length - 1);
        for (let i = 0; i <= maxGroupIndex; i++) {
          const alphabetGroup = groups[i];
          block = alphabetGroup.from.reduce((block, fromElement) => {
            let counter = 0;
            return block.replace(
              new RegExp(fromElement, "gi"),
              alphabetGroup.to[counter++ % alphabetGroup.to.length]
            );
          }, block);
        }
        return {
          text: block,
          alphabetGroup: groups[index],
        };
      })
    );
  }, [text, groups, symbolLimit]);

  return blocks;
};
