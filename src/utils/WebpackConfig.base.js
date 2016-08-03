/**
 * Created by tushar.mathur on 03/08/16.
 */

'use strict'

import config from 'config'
import path from 'path'
import webpack from 'webpack'
import Main from '../components/Main'
import {ApplicationShell} from './AppShellPlugin'
import AppShellSources from './AppShellSources'

/**
 * Loaders
 */
const lessLoader = {test: /\.less$/, loader: 'style!css!less'}
const cssLoader = {test: /\.css$/, loader: 'style-loader!css-loader'}
const imgLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
  ]
}
const babelLoader = {
  test: /.js$/,
  loader: 'babel',
  exclude: /node_modules/
}

/**
 * Base config
 */
export default {
  entry: ['./src/bootstrapDOM.js'],
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: '[hash].bundle.js'
  },
  devServer: {contentBase: './public'},
  plugins: [
    new ApplicationShell({Main, sources: AppShellSources}),
    new webpack.DefinePlugin({APP_CONFIG: JSON.stringify(config)})
  ],
  module: {
    loaders: [lessLoader, cssLoader, imgLoader, babelLoader]
  }
}
