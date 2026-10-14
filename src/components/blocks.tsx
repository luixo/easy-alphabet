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
		const { groups } = alphabet;
		const sentences = text.match(/[^.!?]+[.!?]+/gu) || [text];
		const sentenceGroups = sentences.reduce<string[][]>(
			(acc, sentence) => {
				// The accumulator starts with one block and only grows.
				// oxlint-disable-next-line typescript/no-non-null-assertion
				const lastBlock = acc.at(-1)!;
				lastBlock.push(sentence);
				const symbols = lastBlock.reduce(
					(amount, lastBlockSentence) => amount + lastBlockSentence.length,
					0,
				);
				if (symbols >= symbolLimit) {
					acc.push([]);
				}
				return acc;
			},
			[[]],
		);
		return sentenceGroups.map((sentenceGroup, index) => {
			let block = sentenceGroup.join("");
			const maxGroupIndex = Math.min(index, groups.length - 1);
			for (let i = 0; i <= maxGroupIndex; i += 1) {
				// The loop is bounded by the last group index.
				// oxlint-disable-next-line typescript/no-non-null-assertion
				const alphabetGroup = groups[i]!;
				block = alphabetGroup.from.reduce((fromBlock, fromElement) => {
					let counter = 0;
					counter += 1;
					return fromBlock.replaceAll(
						new RegExp(fromElement, "giu"),
						// Default alphabet groups always contain replacement symbols.
						// oxlint-disable-next-line typescript/no-non-null-assertion
						alphabetGroup.to[counter % alphabetGroup.to.length]!,
					);
				}, block);
			}
			return {
				alphabetGroup: groups[index],
				text: block,
			};
		});
	}, [text, symbolLimit, alphabet]);
	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<button
					type="button"
					className="cursor-pointer rounded-sm border px-2 py-1"
					onClick={resetAlphabet}
				>
					{t("settings.resetAlphabet")}
				</button>

				<button
					type="button"
					className="cursor-pointer rounded-sm border px-2 py-1"
					onClick={resetText}
				>
					{t("settings.resetText")}
				</button>
			</div>

			<div>
				{blocks.map((block, index) => (
					// oxlint-disable-next-line react/no-array-index-key
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
