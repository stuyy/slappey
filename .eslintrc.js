module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "linebreak-style": "off",
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "import/extensions": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    quotes: [2, "double"],
  },
};
