/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {i} from 'cycle-maquette'
import * as F from './Flexbox'
import {Pallete} from './Themes'

export const size = (height, width = height) => ({height: `${height}px`, width: `${width}px`})
export const position = coords => {
  const positions = {}
  Object.keys(coords)
    .filter(x => coords[x] !== null)
    .forEach(key => {
      positions[key] = coords[key]
    })
  return positions
}
export const absolute = (left = 0, top = 0, right = 0, bottom = 0) => {
  return {...position({left, top, right, bottom}), position: 'absolute'}
}
export const fixed = x => {
  return {...position(x), position: 'fixed'}
}

export const fa = (name, dim = 1) => i(`.fa.fa-${name}`, {
  style: stringifyStyle({
    'font-size': `${dim}em`,
    ...F.ColMiddle
  })
})
export const overflowEllipsisSTY = {
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis'
}

export const subtitleSTY = {
  color: Pallete.baseColorSecondaryFont, 'font-size': '0.8em'
}

export const block = (height, width = height) => ({
  ...size(height, width),
  ...F.ColMiddle
})

export const stringifyStyle = json => {
  return JSON.stringify(json).replace(/,"|"}/g, ';').replace(/"/g, '').replace(/}/g, ';').substring(1)
}
