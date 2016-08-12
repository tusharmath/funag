/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {name} from '../../package.json'
import HTML from '../components/html/html'
import Main from '../components/main/main'
import {sheets} from './CreateStyle'
import * as R from 'ramda'

export const getAssetKeys = R.compose(R.keys, R.prop('assets'))
export const findAsset = R.uncurryN(2, type => R.compose(R.head, R.filter(R.contains(type)), getAssetKeys))
export const findChunkFile = R.uncurryN(2, chunk => R.compose(R.head, R.path(['namedChunks', chunk, 'files'])))
export const wrapHTML = R.curry((compilation, content) => {
  const manifest = findAsset('manifest', compilation)
  const bundle = findChunkFile('client', compilation)
  const sw = findChunkFile('sw', compilation)
  return HTML({
    content,
    title: name,
    bundle,
    manifest,
    sw,
    style: sheets.toString()
  })
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
      const main = React.createFactory(Main)
      const content = ReactDOMServer.renderToString(main())
      const html = wrapHTML(compilation, content)
      onHTML(compilation, cb, html)
    }
    compiler.plugin('emit', onEmit)
  }
}
