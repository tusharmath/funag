/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'

export default R.curry((compilation, html) => {
  const manifest = findAsset('manifest', compilation)
  const bundle = findChunkFile('client', compilation)
  const sw = findChunkFile('sw', compilation)
  return HTML({html, title: name, bundle, manifest, sw})
})
