/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import ClosureCompilerPlugin from 'webpack-closure-compiler'
import CompressionPlugin from 'compression-webpack-plugin'
import Configurator from './Configurator'
import BaseConfig from './WebpackConfig.base'
import R from 'ramda'

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

export default configFactory(BaseConfig)
