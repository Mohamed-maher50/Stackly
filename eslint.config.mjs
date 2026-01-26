// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import ImportSorting from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: { "simple-import-sort": ImportSorting },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "sort-imports": "off",
      "import/order": "off",
    },
  }, // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
