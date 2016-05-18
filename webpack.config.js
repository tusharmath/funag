/**
 * Created by tushar.mathur on 13/04/16.
 */

'use strict'

require('babel-register')({
  presets: ['es2015'],
  plugins: [
    'transform-object-rest-spread'
  ]
})
const path = require('path')
const webpack = require('webpack')
const config = require('config')
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const CompressionPlugin = require('compression-webpack-plugin')
const {ApplicationShell} = require('./src/utils/ApplicationShell')
const Main = require('./src/components/Main').default
const {makeHTMLDriver} = require('@cycle/dom')
const {makeHTTPDriver} = require('@cycle/http')
const {mockAudioDriver} = require('./src/drivers/audio')
const {eventSinkDriver} = require('./src/drivers/eventSink')
const {makeModelDriver} = require('./src/drivers/model')
const noop = require('./src/utils/Noop')

const sources = {
  DOM: makeHTMLDriver(),
  audio: mockAudioDriver,
  events: eventSinkDriver,
  title: noop,
  HTTP: makeHTTPDriver(),
  MODEL: makeModelDriver({isServer: true})
}

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
  entry: ['./src/bootstrapDOM.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[hash].bundle.js'
  },
  devtool: config.webpack.devtool,
  devServer: {
    contentBase: './public'
  },
  plugins: [
    new ApplicationShell({Main, sources}),
    new webpack.DefinePlugin({APP_CONFIG: JSON.stringify(config)})
  ].concat(plugins),
  module: {
    loaders: [
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
