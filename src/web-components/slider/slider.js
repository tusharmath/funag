/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import getClientX from '../../lib/getClientX'
import customEvent from '../../dom-api/customEvent'

const getStyle = ({translateX}) => {
  return {delayed: {transform: `translateX(${translateX}%)`}}
}

export const init = () => {
  return {
    isMoving: false,
    translateX: 0
  }
}

function getTranslateX (completion) {
  return 100 * (completion - 1)
}

function completionIsValid (completion) {
  return [
    isNaN(completion) === false,
    completion >= 0,
    completion <= 1
  ].every(Boolean)
}

function getValidCompletion (completion, state) {
  const isValid = completionIsValid(completion, state)
  const translateX = getTranslateX(completion)
  return isValid ? translateX : state.translateX
}

function setTranslateX (completion, state) {
  return R.assoc(
    'translateX',
    getValidCompletion(completion, state),
    state
  )
}

function setTouchMove (touch, state) {
  return setTranslateX(getClientX(touch) / state.width, state)
}

function setTranslateXOnAttrChange (attr, state) {
  return state.isMoving ? state : setTranslateX(Number(attr), state)
}

function setComponentWidth (component, state) {
  const width = component.getBoundingClientRect().width
  return R.assoc('width', width, state)
}

export const update = (state, {type, params}) => {
  switch (type) {
    case 'START':
      return R.assoc('isMoving', true, state)
    case 'END':
      return [
        R.assoc('isMoving', false, state),
        customEvent('change', {completion: 1 + state.translateX / 100})
      ]
    case 'MOVE':
      return setTouchMove(params, state)
    case '@@rwc/attr/completion':
      return setTranslateXOnAttrChange(params, state)
    case '@@rwc/attached':
      return setComponentWidth(params, state)
    default:
      return state
  }
}

export const view = ({translateX, isMoving}, dispatch) => {
  return h('div.scrobber', [
    h('div.scrobberTrack', {
      style: getStyle({translateX}),
      class: {'disableAnime': isMoving}
    }, [
      h('div.scrobberIcon', {
        on: {
          touchstart: dispatch('START', {preventDefault: true}),
          touchmove: dispatch('MOVE'),
          touchend: dispatch('END')
        }
      })
    ])
  ])
}

export default {init, update, view}
