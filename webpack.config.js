/**
 * Created by tushar.mathur on 13/04/16.
 */
'use strict'

// NOTE: deployment fails if env is not setup — https://travis-ci.org/funag/ui-core#L393
require('./src/lib/env')
module.exports = require('./src/lib/WebpackConfig.env').default
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const CompressionPlugin = require('compression-webpack-plugin')
const C = require('webpack-super').default
const BaseConfig = require('./src/lib/WebpackConfig.base').default

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
const plugin = C.appendAt('plugin')
const configFactory = C.compose(
  // Plugins
  C.when(APP_CONFIG.webpack.optimizeJS, plugin(closureCompilerPlugin)),
  C.when(APP_CONFIG.webpack.compression, plugin(compressionPlugin)),
  C.setAt('devtool', APP_CONFIG.webpack.devtool)
)

module.exports = configFactory(BaseConfig)
