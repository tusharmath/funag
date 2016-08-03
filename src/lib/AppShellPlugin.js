/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import {Observable} from 'rx'
import Cycle from '@cycle/core'
import {name} from '../../package.json'
import HTML from './../layouts/HTML'

const select = compiler => {
  return {
    events (event) {
      return Observable.fromEventPattern(cb => compiler.plugin(event, (...i) => cb(i)))
    }
  }
}

const boilerplate = ({Main, bundle}) => sources => {
  const main = Main(sources)
  const vTree$ = main.DOM.first().map(__html => HTML({__html, __title: name, bundle}))
  return Object.assign({}, main, {DOM: vTree$})
}

export class ApplicationShell {
  constructor ({Main, sources}) {
    this.Main = Main
    this.sources = sources
  }

  apply (compiler) {
    const {Main, sources} = this
    const emit$ = select(compiler).events('emit')
    const bundle$ = emit$
      .map(([{outputOptions, hash}]) => outputOptions.filename.replace('[hash]', hash))

    emit$
      .withLatestFrom(bundle$)
      .flatMapLatest(([[com, cb], bundle]) => {
        const html$ = Cycle.run(boilerplate({Main, bundle}), sources).sources.DOM
        return html$.map(html => ({html, com, cb}))
      })
      .subscribe(({com, cb, html}) => {
        com.assets['index.html'] = {source: () => html, size: () => html.length}
        return cb()
      })
  }
}

exports.ApplicationShell = ApplicationShell
