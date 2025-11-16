import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '.vscode/extensions.js',
      'safari/**',
    ],
  },

  // Base configuration for JS/MJS files with Google-style rules
  js.configs.recommended,

  // Main custom configuration
  {
    files: ['**/*.{js,mjs}'],
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
    },
    rules: {
      // Google-style rules (non-formatting)
      'no-multiple-empty-lines': ['error', { max: 2 }],
      camelcase: 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // Unused variables (lenient for package updates)
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^e$',
        },
      ],

      // Prettier integration
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Override for Node.js configuration files
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['Gruntfile.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },

  // Prettier config must be last
  // This turns off all rules that are unnecessary or might conflict with Prettier.
  prettierConfig,
];
