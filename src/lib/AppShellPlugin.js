/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import * as R from 'ramda'
import toHTML from 'snabbdom-to-html'
import {name} from '../../package.json'
import HTML from '../components/html/html'
import Main from '../components/main/main'

export const getAssetKeys = R.compose(R.keys, R.prop('assets'))
export const findAsset = R.uncurryN(2, type => R.compose(R.head, R.filter(R.contains(type)), getAssetKeys))
export const findChunkFile = R.uncurryN(2, chunk => R.compose(R.head, R.path(['namedChunks', chunk, 'files'])))
export const wrapMain = R.curry((compilation, main) => {
  const manifest = findAsset('manifest', compilation)
  const bundle = findChunkFile('client', compilation)
  const sw = findChunkFile('sw', compilation)
  return HTML({main, title: name, bundle, manifest, sw})
})
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
      const main = Main.render()
      onHTML(compilation, cb, toHTML(wrapMain(compilation, main)))
    }
    compiler.plugin('emit', onEmit)
  }
}

exports.ApplicationShell = ApplicationShell
