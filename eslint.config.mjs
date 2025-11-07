// @ts-check
import {defineConfig} from 'eslint/config'
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import angular from 'angular-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    plugins: {
      '@stylistic': stylistic
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@stylistic/brace-style': [
        'error',
        '1tbs'
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/indent': ['error', 'tab'],
      '@stylistic/max-len': ['error', {'code': 190, 'ignoreStrings': true}],

      'arrow-body-style': ['error', 'as-needed'],
      'no-console': [
        'error',
        {
          'allow': [
            'log',
            'warn',
            'dir',
            'timeLog',
            'assert',
            'clear',
            'count',
            'countReset',
            'group',
            'groupEnd',
            'table',
            'dirxml',
            'error',
            'groupCollapsed',
            'Console',
            'profile',
            'profileEnd',
            'timeStamp',
            'context',
            'createTask'
          ]
        }
      ],
      'no-debugger': 'error',
      'curly': 'error',
      'dot-notation': 'off',
      'eqeqeq': ['error', 'smart'],
      'guard-for-in': 'error',
      'id-denylist': 'off',
      'id-match': 'off',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-empty-function': ['error', {'allow': ['constructors']}],
      'no-eval': 'error',
      'no-new-wrappers': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'padding-line-between-statements': [
        'error',
        {'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*'},
        {'blankLine': 'never', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var']},
        {'blankLine': 'always', 'prev': '*', 'next': 'return'},
        {'blankLine': 'never', 'prev': ['case', 'default'], 'next': '*'},
      ],

      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          'accessibility': 'explicit'
        }
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          'multiline': {
            'delimiter': 'semi',
            'requireLast': true
          },
          'singleline': {
            'delimiter': 'semi',
            'requireLast': false
          }
        }
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'variable',
          'format': [
            'camelCase',
            'UPPER_CASE'
          ],
          'leadingUnderscore': 'forbid',
          'trailingUnderscore': 'forbid'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          'ignoreParameters': true
        }
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          'hoist': 'all'
        }
      ],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/unified-signatures': 'error',

      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/elements-content': 'off'
    },
  })

