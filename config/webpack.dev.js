const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('进入dev模式');
const config = require('./');
const commonConfig = require('./webpack.common');


const devConfig = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: config.paths.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
});

module.exports = devConfig;