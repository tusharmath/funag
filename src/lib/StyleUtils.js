/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {i} from '@cycle/dom'

export const size = (height, width = height) => ({
  height: `${height}px`,
  width: `${width}px`
})
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

export const fa = (name, dim = 1) => i(`.fa.fa-${name} flb col jc_c ai_c`, {style: {fontSize: `${dim}em`}})
export const overflowEllipsisSTY = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

export const block = (height, width = height) => ({
  ...size(height, width),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const css = (...args) => args.join(' ')
