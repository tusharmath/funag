/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import Cycle from '@cycle/rx-run'
import {name} from '../../package.json'
import Main from '../components/main/main'
import {Observable} from 'rx'
import {makeHTMLDriver} from '@cycle/dom'
import {mockAudioDriver} from '../drivers/audio'
import * as R from 'ramda'
import {createReduxDriver} from '../drivers/reduxDriver'
import wrapHTML from './wrapHTML'
import createAsset from './createAsset'

export const createWrappedMain = R.curry((Main, compilation, sources) => {
  const main = Main(sources)
  const DOM = main.DOM.first().map(wrapHTML(compilation))
  return R.merge(main, {DOM})
})

export const onHTML = R.curry((compilation, cb, html) => {
  compilation.assets['index.html'] = createAsset(html)
  cb()
})
export class ApplicationShell {
  apply (compiler) {
    const onEmit = (compilation, cb) => {
      const sources = {
        STORE: createReduxDriver(),
        DOM: makeHTMLDriver(onHTML(compilation, cb)),
        AUDIO: mockAudioDriver,
        EVENTS: () => ({select: () => Observable.never()}),
        title: () => ({}),
        HTTP: () => Observable.never()
      }
      Cycle.run(createWrappedMain(Main, compilation), sources)
    }
    compiler.plugin('emit', onEmit)
  }
}

exports.ApplicationShell = ApplicationShell
