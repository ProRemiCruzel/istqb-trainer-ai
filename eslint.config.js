const tsParser = require('@typescript-eslint/parser'); // Import du parser TypeScript
const tsPlugin = require('@typescript-eslint/eslint-plugin'); // Import du plugin TypeScript
const prettierPlugin = require('eslint-plugin-prettier'); // Import du plugin Prettier

module.exports = [
    {
        ignores: ['node_modules', 'dist'], // Ignore les dossiers non nécessaires
    },
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'], // Fichiers ciblés
        languageOptions: {
            parser: tsParser, // Utilisation correcte du parser TypeScript
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true, // Si vous utilisez JSX
                },
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin, // Utilisation du plugin TypeScript
            prettier: prettierPlugin, // Utilisation du plugin Prettier
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-console': 'warn',
            'no-debugger': 'error',
            eqeqeq: ['error', 'always'],
        },
    },
];