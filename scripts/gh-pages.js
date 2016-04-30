#!/usr/bin/env node
/**
 * Created by tushar.mathur on 30/04/16.
 */

'use strict'
const {Observable} = require('rx')
const path = require('path')
const rimraf = Observable.fromCallback(require('rimraf'))
const webpack = Observable.fromNodeCallback(require('webpack'))
const publish = Observable.fromCallback(require('gh-pages').publish)
const webpackConfig = require('../webpack.config')
const log = message => () => console.log(message)
const env = process.env

// Makes sure that publish happens only in master
const canPublish = [
  env.TRAVIS_PULL_REQUEST === 'false',
  env.TRAVIS_BRANCH === 'master'
].every(Boolean)

// gh-pages config
const GH_PAGES_PUBLISH_CONFIG = {
  user: {
    name: 'travisbot',
    email: 'support@travis-ci.org'
  },
  branch: 'master',
  logger: console.log.bind(console),
  repo: `https://${env.GH_TOKEN}@github.com/funag/funag.github.io.git`
}

// Delete all files in public folder

const jobs = rimraf('public/**')
  .tap(log('Files Deleted'))

  // Create new files in public folder
  .flatMap(() => webpack(webpackConfig))
  .tap(log('Webpack Build Completed'))

  // Ignore unpublishables
  .tap(log(`Is Publishable: [${canPublish}]`))
  .filter(() => canPublish)

  // Publish to github
  .flatMap(() => publish(path.resolve(__dirname, '../public'), GH_PAGES_PUBLISH_CONFIG))
  .tap(x => console.log('Github Publish Completed', x))

jobs.subscribe(log('All Jobs Done'))
