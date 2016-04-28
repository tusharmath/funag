/**
 * Created by tushar.mathur on 13/04/16.
 */

'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('config')
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = []
if (config.webpack.optimizeJS) {
  plugins.push(new ClosureCompilerPlugin({
    compiler: {language_in: 'ECMASCRIPT6', language_out: 'ECMASCRIPT5', compilation_level: 'SIMPLE'},
    concurrency: 3
  }))
}

if (config.webpack.compression) {
  plugins.push(new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.js$|\.html$/
  }))
}

module.exports = {
  entry: ['./src/ui/bootstrap.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[hash].bundle.js'
  },
  devtool: config.webpack.devtool,
  devServer: {
    contentBase: './public'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Flo',
      template: './src/ui/pwd/index.template.hbs'
    }),
    new webpack.DefinePlugin({APP_CONFIG: JSON.stringify(config)})
  ].concat(plugins),
  module: {
    loaders: [
      {test: /\.hbs$/, loader: 'handlebars'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          // TODO: Read from package.json
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  }
}
