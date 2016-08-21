/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import Cycle from '@cycle/rx-run'
import {name} from '../../package.json'
import HTML from '../components/html/html'
import Main from '../components/main/main'
import {Observable} from 'rx'
import {makeHTMLDriver} from '@cycle/dom'
import {mockAudioDriver} from '../drivers/audio'
import * as R from 'ramda'

export const getAssetKeys = R.compose(R.keys, R.prop('assets'))
export const findAsset = R.uncurryN(2, type => R.compose(R.head, R.filter(R.contains(type)), getAssetKeys))
export const findChunkFile = R.uncurryN(2, chunk => R.compose(R.head, R.path(['namedChunks', chunk, 'files'])))
export const wrapHTML = R.curry((compilation, html) => {
  const manifest = findAsset('manifest', compilation)
  const bundle = findChunkFile('client', compilation)
  const sw = findChunkFile('sw', compilation)
  return HTML({html, title: name, bundle, manifest, sw})
})
export const createWrappedMain = R.curry((Main, compilation, sources) => {
  const main = Main(sources)
  const DOM = main.DOM.first().map(wrapHTML(compilation))
  return R.merge(main, {DOM})
})
export const getBundleName = R.compose(R.head, R.path(['namedChunks', 'client', 'files']))
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
      const sources = {
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
