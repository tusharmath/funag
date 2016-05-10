/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

require('babel-register')({
  presets: ['es2015']
})
const t = require('argtoob')
const {Observable} = require('rx')
const Cycle = require('@cycle/core')
const {makeHTMLDriver} = require('@cycle/dom')
const {makeHTTPDriver} = require('@cycle/http')

const {name} = require('../package.json')
const Main = require('./components/Main').default
const HTML = require('./layouts/HTML').default
const {mockAudioDriver} = require('./drivers/audio')
const {eventSinkDriver} = require('./drivers/eventSink')
const {documentTitleDriver} = require('./drivers/documentTitle')

const sources = {
  DOM: makeHTMLDriver(),
  audio: mockAudioDriver,
  events: eventSinkDriver,
  title: documentTitleDriver,
  HTTP: makeHTTPDriver()
}

class IsomorphicRenderPlugin {
  apply (compiler) {
    const emit$ = Observable.fromCallback(compiler.plugin, compiler)('emit')
    const compilation$ = emit$.map(x => x[0])
    const callback$ = emit$.map(x => x[1])
    const bundleJS$ = compilation$.map(({outputOptions, hash}) => outputOptions.filename.replace('[hash]', hash))

    const boilerplate = appFn => sources => {
      const app = appFn(sources)
      const vTree$ = app.DOM.first().combineLatest(bundleJS$, t('__html', 'bundle'))
        .map(({__html, bundle}) => HTML({__html, __title: name, bundle}))
      return Object.assign({}, app, {DOM: vTree$})
    }

    const {sources: {DOM}} = Cycle.run(boilerplate(Main), sources)
    DOM.withLatestFrom(compilation$, callback$, t('html', 'compilation', 'callback'))
      .shareReplay(1)
      .subscribe(({html, compilation, callback}) => {
        compilation.assets['index.html'] = {source: () => html, size: () => html.length}
        return callback()
      })
  }
}

exports.IsomorphicRenderPlugin = IsomorphicRenderPlugin
