module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'all',
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-require-imports': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
