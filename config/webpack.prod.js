const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('进入prod模式');
const config = require('./');
const commonConfig = require('./webpack.common');


const prodConfig = webpackMerge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: config.paths.dist(),
    publicPath: '/',
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[id].[chunkhash:5].chunk.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});


module.exports = prodConfig;