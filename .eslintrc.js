module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: [
    'node_modules/*',
    '.next/*',
    '.out/*',
    'build/*',
    '!.prettierrc.js',
  ],
  rules: {
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'warn',
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '_*'
      },
    ],
    'react/jsx-key': 'off',
    'react/no-unescaped-entities': 'off'
  },
};
