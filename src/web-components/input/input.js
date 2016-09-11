/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import R from 'ramda'
import h from 'snabbdom/h'
import targetValue from '../../dom-api/targetValue'
import {FunagInputValue} from './input.events'

function onValue (params, state) {
  const value = targetValue(params)
  const icon = value.length > 0 ? 'close' : state.defaultIcon
  const event = state.value === value ? null : FunagInputValue.of(value)
  return [R.merge(state, {value, icon}), event]
}
function onClick (state) {
  return [
    R.merge(state, {value: '', icon: state.defaultIcon}),
    FunagInputValue.of('')
  ]
}
export default {
  init (e) {
    return {
      active: false,
      value: '',
      icon: e.getAttribute('icon'),
      defaultIcon: e.getAttribute('icon'),
      placeholder: e.getAttribute('placeholder') || ''
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attr/placeholder':
        return R.assoc('placeholder', params, state)
      case '@@rwc/attr/icon':
        return R.merge(state, {defaultIcon: params, icon: params})
      case 'VALUE':
        return onValue(params, state)
      case 'CLICK':
        return onClick(state)
      default:
        return state
    }
  },

  view ({placeholder, icon, value}, dispatch) {
    return h('fg-stay-focused-on', {props: {select: 'input'}}, [
      h(`div.container`, [
        h(`input.input`, {
          on: {keyup: dispatch('VALUE')},
          props: {type: 'text', placeholder, value}
        }),
        icon ? h('button.icon-button', {on: {click: dispatch('CLICK')}}, [
          h('i.material-icons', [icon])
        ]) : ''
      ])
    ])
  }
}
