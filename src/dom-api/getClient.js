/**
 * Created by tushar.mathur on 19/09/16.
 */

'use strict'

export const getClient = (touch) => touch.changedTouches[0]

export const getClientX = touch => getClient(touch).clientX
export const getClientY = touch => getClient(touch).clientY
