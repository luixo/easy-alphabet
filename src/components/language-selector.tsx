import { GB, GE, RU } from "country-flag-icons/react/3x2";
import React from "react";
import { useTranslation } from "react-i18next";
import { entries, values } from "remeda";
import { twMerge } from "tailwind-merge";

import { useLanguage } from "~/hooks/use-language";
import type { Language } from "~/utils/i18n";

const MAPPING = {
	en: "GB",
	ka: "GE",
	ru: "RU",
} as const;

const DEMAPPING = entries(MAPPING).reduce(
	(acc, [key, value]) => {
		acc[value] = key;
		return acc;
	},
	{} as Record<Country, Language>,
);

type Country = (typeof MAPPING)[keyof typeof MAPPING];

const LABELS: Record<Country, string> = {
	GB: "EN",
	GE: "KA",
	RU: "RU",
};
const FLAGS: Record<Country, React.FC<React.ComponentProps<typeof GB>>> = {
	GB,
	GE,
	RU,
};

const countries = values(MAPPING);

export const LanguageSelector: React.FC<React.ComponentProps<"div">> = ({
	className,
	...props
}) => {
	const [language, setLanguage] = useLanguage();
	const { i18n } = useTranslation();
	React.useEffect(() => {
		void i18n.changeLanguage(language);
	}, [i18n, language]);
	return (
		<div
			className={twMerge("flex flex-col gap-2 bg-white p-1", className)}
			{...props}
		>
			{countries.map((country) => {
				const FlagComponent = FLAGS[country];
				return (
					<button
						type="button"
						aria-pressed={language === DEMAPPING[country]}
						key={country}
						onClick={() => setLanguage(DEMAPPING[country])}
						className={twMerge(
							"flex cursor-pointer items-center gap-2 rounded-md border bg-white p-1",
							language === DEMAPPING[country] ? "bg-amber-300/50" : undefined,
						)}
					>
						{LABELS[country]}
						<FlagComponent className="h-4 w-5.75 border" />
					</button>
				);
			})}
		</div>
	);
};
