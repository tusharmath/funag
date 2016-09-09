/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'

import wrapHTML from './wrapHTML'

export const createAsset = html => ({
  source: () => html,
  size: () => html.length
})
export class ApplicationShell {
  apply (compiler) {
    const onEmit = (compilation, cb) => {
      compilation.assets['index.html'] = createAsset(
        wrapHTML(compilation).outerHTML
      )
      cb()
    }
    compiler.plugin('emit', onEmit)
  }
}

exports.ApplicationShell = ApplicationShell
