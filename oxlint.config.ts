import { getLintConfig } from "@luixo/configs";

export default getLintConfig({
	ignorePatterns: ["dist/**"],
	rules: {
		// Will be fixed upstream
		"eslint/no-magic-numbers": ["error", { ignore: [0, 1, -1] }],
		// We have a single extra literal
		"react/jsx-no-literals": ["error", { allowedStrings: ["▶"] }],
	},
});
