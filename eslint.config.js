import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: [
      'node_modules/',
      '.next/',
      '.out/',
      'build/',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'warn',
      quotes: [2, 'single', { avoidEscape: true }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '_*',
        },
      ],
      'react/jsx-key': 'off',
      'react/no-unescaped-entities': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
