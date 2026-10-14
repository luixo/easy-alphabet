import { getFormatConfig } from "@luixo/configs";

export default getFormatConfig({
	ignorePatterns: ["dist/**"],
	tailwind: {
		stylesheet: "./src/main.css",
	},
});
