/**
 * Created by tushar.mathur on 13/04/16.
 */

'use strict'

require('babel-register')()
const config = global.APP_CONFIG = require('config')
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const CompressionPlugin = require('compression-webpack-plugin')
const Configurator = require('./src/lib/Configurator').default
const BaseConfig = require('./src/lib/WebpackConfig.base').default
const R = require('ramda')

const closureCompilerPlugin = new ClosureCompilerPlugin({
  compiler: {
    language_in: 'ECMASCRIPT6',
    language_out: 'ECMASCRIPT5',
    compilation_level: 'SIMPLE'
  },
  concurrency: 3
})
const compressionPlugin = new CompressionPlugin({
  algorithm: 'gzip', test: /\.js$|\.html$/
})

const w = Configurator(config.webpack)
const configFactory = R.compose(
  w.ok(['optimizeJS'], w.plugin(closureCompilerPlugin)),
  w.ok(['compression'], w.plugin(compressionPlugin))
)

module.exports = configFactory(BaseConfig)
