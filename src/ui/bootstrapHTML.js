/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import manifestFile from 'file!./manifest.json'
import sw from 'serviceworker!./sw.js'
export const container = document.createElement('div')
document.body.appendChild(container)

const manifest = document.createElement('link')
manifest.href = manifestFile
manifest.rel = 'manifest'
document.head.appendChild(manifest)

sw({scope: '/'})
  .then(
    x => console.log(x.active),
    x => console.error(x)
  )

