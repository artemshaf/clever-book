/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line import/no-extraneous-dependencies
const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: { alias: aliasMap },
    },
  ],
};
