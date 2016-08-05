/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const {forEach, map, curry, apply, values, compose, nthArg} = require('ramda')

const httpProxy = require('http-proxy')
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

const setHeaders = curry((headers, req) => {
  const setHeader = apply(req.setHeader.bind(req))
  const headerParams = map(values)(headers)
  forEach(setHeader, headerParams)
})

app.use('/', express.static(path.resolve(__dirname, 'public')))

if (config.proxy) {
  const consoleError = console.error.bind(console, 'PROXY:')
  const proxy = httpProxy.createProxyServer({secure: false})
  proxy.on('proxyReq', setHeaders(config.proxy.headers))
  // proxy.on('error', err => console.error.bind(console, 'PROXY:')(err))
  proxy.on('error', compose(consoleError, nthArg(0)))
  app.use('/api', (req, res) => proxy.web(req, res, {target: config.proxy.target}))
}

app.listen(config.port, () => console.log('STARTED:', config.port, process.env.NODE_ENV))
