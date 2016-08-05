/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import Cycle from '@cycle/core'
import {name} from '../../package.json'
import HTML from './../layouts/HTML'
import * as R from 'ramda'

export const wrapHTML = R.curry((bundle, __html) => HTML({
  __html, __title: name, bundle
}))
export const boilerplate = R.curry((Main, bundle, sources) => {
  const main = Main(sources)
  const vTree$ = main.DOM.first().map(wrapHTML(bundle))
  return R.merge(main, {DOM: vTree$})
})
export const getBundleName = ({outputOptions, hash}) => outputOptions.filename.replace('[hash]', hash)
export const createAsset = (html) => ({
  source: () => html,
  size: () => html.length
})
export const onHTML = R.curry((compilation, cb, html) => {
  compilation.assets['index.html'] = createAsset(html)
  cb()
})
export class ApplicationShell {
  constructor ({Main, sources}) {
    this.Main = Main
    this.sources = sources
  }

  apply (compiler) {
    const {Main, sources} = this
    const onEmit = (compilation, cb) => {
      const bundle = getBundleName(compilation)
      const html$ = Cycle.run(boilerplate(Main, bundle), sources).sources.DOM
      return html$.subscribe(onHTML(compilation, cb))
    }
    compiler.plugin('emit', onEmit)
  }
}

exports.ApplicationShell = ApplicationShell
