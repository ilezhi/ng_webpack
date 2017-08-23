const path = require('path');
const webpack = require('webpack');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('进入common');

const config = require('./');

const { paths } = config;

console.log('pathssssssss', paths.root('tsconfig.json'));

const commonConfig = {
  entry: {
    polyfills: paths.src('polyfills.ts'),
    vendor: paths.src('vendor.ts'),
    app: paths.src('main.ts'),
  },
  
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: paths.root('tsconfig.json'),
            }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // 全局css
      {
        test: /\.css$/,
        exclude: paths.src('app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // 组件css
      {
        test: /\.css$/,
        include: paths.src('app'),
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, paths.src(), {}),
    new HtmlWepbackPlugin({
      template: paths.src('index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills', 'manifest']
    }),
  ]
};


module.exports = commonConfig;