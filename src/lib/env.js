/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

const path = require('path')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../../config')
global.APP_CONFIG = require('config')
global.snabbdom = require('snabbdom-jsx')
require('babel-register')()
