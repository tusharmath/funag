/**
 * Created by tushar.mathur on 13/04/16.
 */
'use strict'

// NOTE: deployment fails if env is not setup — https://travis-ci.org/funag/ui-core#L393
require('./src/lib/env')
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

const w = Configurator(APP_CONFIG.webpack)
const configFactory = R.compose(
  // Plugins
  w.ok(['optimizeJS'], w.plugin(closureCompilerPlugin)),
  w.ok(['compression'], w.plugin(compressionPlugin)),

  w.copy(['devtool'])
)

module.exports = configFactory(BaseConfig)
