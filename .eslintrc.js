module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'arrow-body-style': ['off'],
    'react/no-unknown-property': ['error', { ignore: ['prefix'] }],
    'no-unused-vars': ['off'],
    'no-console': ['off'],
    'object-shorthand': ['off'],
  },
};
