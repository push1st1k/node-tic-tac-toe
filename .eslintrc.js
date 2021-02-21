module.exports = {
    env: {
        node: true,
        mocha: true,
        es6: true,
    },
    globals: {
        Promise: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    ignorePatterns: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    settings: {}
};
