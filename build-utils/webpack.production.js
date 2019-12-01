const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = () => ({
  output: {
    filename: '[name].[contenthash].min.js',
    chunkFilename: '[name].[contenthash].min.js',
  },
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'source-map',
  plugins: [
    new OfflinePlugin({
      publicPath: '/arquivos/',
      updateStrategy: 'changed',
      autoUpdate: 1000 * 60 * 2,
      caches: {
        main: ['*.js', '*.css'],
      },
      ServiceWorker: {
        publicPath: '/files/sw.js',
        events: true,
        navigateFallbackURL: '/',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].min.css',
      chunkFilename: '[id].css',
    }),
  ],
  stats: {
    excludeAssets: /\.(jpe?g|png|gif|svg|mp4|eot.css|woff2.css|woff.css|ttf.css)$/,
    maxModules: 0,
  },
});
