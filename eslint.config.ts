import js from "@eslint/js";
import type { Linter } from "eslint";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import { configs as reactHooksConfigs } from "eslint-plugin-react-hooks";
import globals from "globals";
import { readFile } from "node:fs/promises";
import ts from "typescript-eslint";

const nodeVersion = await readFile(".nvmrc", "utf8");

const overridenRules = {
  name: "local/overriden",
  rules: {
    "arrow-body-style": "error",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "import-x/no-useless-path-segments": ["error", { noUselessIndex: false }],
    "import-x/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", "parent", "sibling"],
        warnOnUnassignedImports: false,
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
        pathGroups: [
          {
            pattern: "{react,react-dom/client}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{~*/**,~*}",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom", "{~*/**,~*}"],
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": "error",
    "react-hooks/react-compiler": "error",
  },
} satisfies Linter.Config;

const disabledRules = {
  name: "local/disabled",
  rules: {
    "import-x/no-named-as-default-member": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
  },
} satisfies Linter.Config;

export default ts.config(
  { files: ["**/*.{ts,tsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2017,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      node: {
        version: nodeVersion.toString(),
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  importPlugin.flatConfigs["react-native"],
  importPlugin.flatConfigs["stage-0"],
  reactHooksConfigs["recommended-latest"],
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  reactPlugin.configs.flat.recommended!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  reactPlugin.configs.flat["jsx-runtime"]!,
  js.configs.recommended,
  prettierConfig,
  /* Typescript section */
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  ts.configs.disableTypeChecked,
  importPlugin.flatConfigs.typescript,
  /* Overrides section */
  overridenRules,
  disabledRules,
  {
    files: ["**/*.{mjs,js,jsx}"],
    ...ts.configs.disableTypeChecked,
  },
  {
    // see https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: [".history/", "dist/"],
  },
);
