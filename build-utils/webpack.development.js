const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');

const flatten = (lists) => lists.reduce((a, b) => a.concat(b), []);
const getDirectories = (srcpath) =>
  fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((folderPath) => fs.statSync(folderPath).isDirectory());
const getDirectoriesRecursive = (srcpath) => [
  srcpath,
  ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive)),
];

module.exports = () => ({
  devServer: {
    contentBase: getDirectoriesRecursive('./dist'),
    watchContentBase: true,
    stats: {
      excludeAssets: /\.(jpe?g|png|gif|svg|mp4|eot.css|woff2.css|woff.css|ttf.css)$/,
      chunks: false,
      cached: false,
      chunkOrigins: false,
      children: false,
      modules: false,
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
});
