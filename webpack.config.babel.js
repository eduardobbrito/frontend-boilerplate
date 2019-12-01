import { ProgressPlugin } from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import webpackMerge from 'webpack-merge';
import WebpackBar from 'webpackbar';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { resolve } from 'path';
import { loader as _loader } from 'mini-css-extract-plugin';
import presetConfig from './build-utils/loadPresets';

const StyleLintPlugin = require('stylelint-webpack-plugin');

const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env); //eslint-disable-line

export default ({ mode, presets } = { mode: 'production', presets: [] }) =>
  webpackMerge(
    {
      mode,
      entry: {
        index: './src/js/index.js',
      },
      output: {
        path: resolve(__dirname, 'arquivos'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/arquivos/',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
          },
          {
            test: /\.pug$/,
            use: ['pug-loader'],
            exclude: [resolve(__dirname, 'src/templates/*')],
          },
          {
            test: /\.(css)$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(scss)$/,
            use: [_loader, 'css-loader', 'postcss-loader', 'sass-loader'],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new ProgressPlugin(),
        new WebpackBar(),
        new StyleLintPlugin({
          content: './src/scss/main.scss',
          configFile: '.stylelintrc',
          fix: true,
          syntax: 'scss',
          failOnError: false,
        }),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets }),
  );
