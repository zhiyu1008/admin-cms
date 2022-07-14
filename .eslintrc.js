module.exports = {
  root: true,
  env: {
    node: true
  },
  overrides: [{
    files: ['src/views/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 0,
    },
  }, ],
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off', // prettier 和 ESLint 的冲突问题
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"], //需要忽略的组件名
      },
    ],
    'indent': ['off', 2],
    //关闭组件命名规则
    "vue/multi-word-component-names": "off",
    'vue/valid-v-for': 'off',
    'vue/no-mutating-props': 'off',
    'dot-notation': 'off',
    'prefer-const': 'off',
    'vue/return-in-computed-property': 'off',
    'array-callback-return': 'off'
  }
}
