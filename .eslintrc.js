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
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_"
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
