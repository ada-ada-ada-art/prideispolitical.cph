module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly"
  },
  extends: [
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  // More Vue rules can be found here: https://eslint.vuejs.org/rules/
  rules: {
  }
}
