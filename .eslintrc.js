module.exports = {
  globals: {
    server: true,
  },
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember',
    'security'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:security/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }],
    'no-trailing-spaces': ['error'],
    'keyword-spacing': ['error'],
    'max-params': ['warn'],
    'max-lines': ['warn'],
    'max-lines-per-function': ['warn'],
    'camelcase': ['warn', { properties: 'never', ignoreDestructuring: false }],
    'comma-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['warn', 'never'],
    'ember/no-mixins': ['warn'],
    'ember/no-observers': ['warn'],
    'ember/no-get': ['warn'],
    'ember/use-ember-data-rfc-395-imports': ['warn'],
    'ember/no-new-mixins': ['warn'],
    'ember/no-deeply-nested-dependent-keys-with-each': ['warn'],
    'ember/require-return-from-computed': ['warn'],
    'ember/use-brace-expansion': ['warn'],
    'ember/require-computed-property-dependencies': ['warn'],
    'semi': ['warn', 'never'],
    'eqeqeq': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'ember/no-classic-classes': ['warn'],
    'ember/require-tagless-components': ['off'],
    'ember/classic-decorator-no-classic-methods': ['warn'],
    'ember/require-valid-css-selector-in-test-helpers': ['warn'],
    'ember/no-shadow-route-definition': ['warn'],
    'ember/no-actions-hash': ['warn'],
    'ember/no-classic-components': ['warn'],
    'ember/no-component-lifecycle-hooks': ['warn'],
    'ember/require-super-in-lifecycle-hooks': ['warn'],
    'ember/no-computed-properties-in-native-classes': ['warn']
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
}
