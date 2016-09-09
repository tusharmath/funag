/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import findChunkFile from './findChunkFile'
import findAsset from './findAsset'
import HTML from '../components/html/html'
import {name} from '../../package.json'

export default (compilation) => {
  const bundle = findChunkFile('client', compilation)
  const sw = findChunkFile('sw', compilation)
  return HTML({title: name, bundle, sw})
}
