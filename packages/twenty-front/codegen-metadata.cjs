module.exports = {
  schema: process.env.REACT_APP_SERVER_BASE_URL + "/metadata",
  documents: ['./src/modules/object-metadata/graphql/*.ts', './src/modules/object-record/graphql/*.tsx', './src/modules/metadata/graphql/*.ts'],
  overwrite: true,
  generates: {
    './src/generated-metadata/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false
      }
    },
  },
};
