/**
 * Created by tushar.mathur on 03/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import styles from './swipeable-pane.style'
import getClientX from '../../dom-api/getClientX'
const css = styles.classes

function getCount (attr) {
  const count = parseInt(attr, 10)
  return isNaN(count) ? 0 : count
}
function getWidth (el) {
  return el.getBoundingClientRect().width
}
function getMovingPaneStyles ({translateX, width, count}) {
  return {
    delayed: {transform: `translateX(${translateX}px)`},
    width: `${width * count}px`
  }
}

function getSelected (state, params) {
  const delta = state.pointerStart - getClientX(params)
  const sign = Math.sign(delta)
  const nextSelected = state.selected + sign
  const isInRange = nextSelected >= 0 && nextSelected < state.count
  const isValid = Math.abs(delta) > 100 && isInRange
  return isValid ? nextSelected : state.selected
}

function createEvent (_state) {
  return new CustomEvent('change', {detail: _state.selected})
}

export default {
  init (e) {
    return {
      count: getCount(e.getAttribute('count')),
      width: getWidth(e),
      translateX: 0,
      selected: 0,
      pointerStart: 0,
      pointerMove: 0,
      isMoving: false
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@attr/count':
        return R.assoc('count', getCount(params), state)
      case '@@attached':
        return R.assoc('width', getWidth(params), state)
      case 'MOVE':
        const clientX = getClientX(params)
        return Object.assign({}, state, {
          translateX: clientX + state.translateX - state.pointerMove,
          pointerMove: clientX
        })
      case 'START':
        return Object.assign({}, state, {
          isMoving: true,
          pointerMove: getClientX(params),
          pointerStart: getClientX(params)
        })
      case 'END':
        const selected = getSelected(state, params)
        const event = selected === state.selected ? null : createEvent(
          selected
        )
        const _state = {
          isMoving: false,
          translateX: -selected.selected * selected.width,
          selected
        }
        return [Object.assign({}, state, _state), event]
      default :
        return state
    }
  },
  view ({translateX, width, isMoving, count}, Dispatch) {
    return h(`div`, [
      h(`div.${css.swipeablePane}`, {
        style: {width},
        on: {
          touchmove: Dispatch('MOVE'),
          touchstart: Dispatch('START'),
          touchend: Dispatch('END')
        }
      }, [
        h(`div.${css.movingPane}`, {
          style: getMovingPaneStyles({translateX, width, count}),
          class: {[css.noAnime]: isMoving}
        }, [
          h(`slot`)
        ])
      ])
    ])
  }
}

