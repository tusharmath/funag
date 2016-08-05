/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import Cycle from '@cycle/rx-run'
import {name} from '../../package.json'
import HTML from './../layouts/HTML'
import Main from '../components/Main'
import {Observable} from 'rx'
import {makeHTMLDriver} from '@cycle/dom'
import {mockAudioDriver} from '../drivers/audio'
import {eventSinkDriver} from '../drivers/eventSink'
import noop from './Noop'
import * as R from 'ramda'

export const wrapHTML = R.curry((bundle, __html) => HTML({
  __html, __title: name, bundle
}))
export const createWrappedMain = R.curry((Main, bundle, sources) => {
  const main = Main(sources)
  const DOM = main.DOM.first().map(wrapHTML(bundle))
  return R.merge(main, {DOM})
})
export const getBundleName = ({outputOptions, hash}) => outputOptions.filename.replace('[hash]', hash)
export const createAsset = html => ({
  source: () => html,
  size: () => html.length
})
export const onHTML = R.curry((compilation, cb, html) => {
  compilation.assets['index.html'] = createAsset(html)
  cb()
})
export class ApplicationShell {
  apply (compiler) {
    const onEmit = (compilation, cb) => {
      const bundle = getBundleName(compilation)
      const sources = {
        DOM: makeHTMLDriver(onHTML(compilation, cb)),
        AUDIO: mockAudioDriver,
        events: eventSinkDriver,
        title: noop,
        HTTP: () => Observable.never()
      }
      Cycle.run(createWrappedMain(Main, bundle), sources)
    }
    compiler.plugin('emit', onEmit)
  }
}

exports.ApplicationShell = ApplicationShell
