module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // enables Prettier integration
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react", "react-hooks", "prettier", "react-refresh"],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: false,
        trailingComma: "es5",
        endOfLine: "auto",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
}
