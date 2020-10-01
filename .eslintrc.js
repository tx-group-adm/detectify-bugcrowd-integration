module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  rules: {
    'comma-dangle': ['off'],
    'no-unused-vars': ['warn'],
    'no-var': ['off'],
    'one-var': ['off'],
    'max-len': ['off'],
    'brace-style': ['off'],
    'no-console': ['off'],
    'object-curly-newline': ['off'],
    'no-use-before-define': ['off'],
    'no-param-reassign': 'off'
  }
};
