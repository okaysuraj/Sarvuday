const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
// Both clients import the API contract from this sibling directory.
config.watchFolders = [...(config.watchFolders || []), path.resolve(__dirname, '../shared')];

module.exports = withNativeWind(config, { input: './src/global.css' });
