// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ["./tsconfig.lib.json"]
    ecmaVersion: 'es6',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: [
    ".idea",
    "build",
    "node_modules",
    "reports",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ],
    "no-restricted-syntax": [
      "error",
      {
        message: "Don't focus tests!",
        selector: "CallExpression[callee.name='fit']",
      },
      {
        message: "Don't disable tests!",
        selector: "CallExpression[callee.name='xit']",
      }
    ]
  },
  overrides: [
    {
      files: ["src/**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      }
    }
  ]
}
