/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

const config = require('config')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config')
const app = express()
require('rx').config.longStackSupport = true
if (config.webpack.middleware) {
  app.use(webpackMiddleware(webpack(webpackConfig)))
}

if (config.express.useGzipped) {
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'application/javascript')
    next()
  })
}

app.use('/', express.static(path.resolve(__dirname, 'public')))
app.listen(config.port, () => console.log('STARTED:', config.port, process.env.NODE_ENV))
