import { getFormatConfig } from "@luixo/configs";

export default getFormatConfig({
	tailwind: {
		stylesheet: "./src/main.css",
	},
	ignorePatterns: ["dist/**"],
});
