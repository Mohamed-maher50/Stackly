import type { UserConfig } from "@commitlint/types";

const commitlintConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build", //build: update vite and react dependencies
        "chore", //chore: remove unused files
        "ci", //ci: add node version to github actions
        "docs", //docs: update installation steps in README
        "feat", //feat: add drag and drop cards
        "fix", //fix: prevent card duplication on refresh
        "perf", //perf: optimize board selector memoization
        "refactor", //refactor: simplify board reducer logic
        "revert", //revert: revert "feat: add card filtering"
        "style", //style: format board slice with prettier
        "test", //test: add unit tests for board reducer
      ],
    ],
    "subject-case": [0], // disable enforcing subject case
    "header-max-length": [2, "always", 72],
  },
};

export default commitlintConfig;
