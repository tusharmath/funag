/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'

export const size = (height, width = height) => ({
  height: `${height}px`,
  width: `${width}px`
})

export const overflowEllipsisSTY = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

export const block = (height, width = height) => R.merge(size(height, width), {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const css = (...args) => args.join(' ')
