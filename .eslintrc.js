module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      //eslint校验不成功后，error或2则报错，warn或1警告，off或0无提示
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 160
      }
    ] 
  }
}
