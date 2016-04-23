/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

export const size = (height, width) => ({height: `${height}px`, width: `${width}px`})
export const absolute = (left = 0, top = 0, right = 0, bottom = 0) => ({
  top, bottom, left, right,
  position: 'absolute'
})
