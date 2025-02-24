const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    js.configs.recommended, // Base ESLint rules
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            sourceType: 'module'
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettier
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
        }
    },
    prettierConfig // Ensure Prettier formatting is enforced
];
