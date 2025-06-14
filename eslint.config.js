import next from 'eslint-config-next'

export default [
  {
    ...next(),
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
]
