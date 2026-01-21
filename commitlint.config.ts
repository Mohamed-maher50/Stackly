import type { UserConfig } from "@commitlint/types";

const commitlintConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "subject-case": [0], // disable enforcing subject case
    "header-max-length": [2, "always", 72],
  },
};

export default commitlintConfig;
