/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import R from 'ramda'
import h from 'snabbdom/h'
import targetValue from '../../dom-api/targetValue'

export default {
  init (e) {
    return {
      active: false,
      value: '',
      icon: 'search',
      placeholder: e.getAttribute('placeholder')
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attr/placeholder':
        return R.assoc('placeholder', params, state)
      case 'VALUE':
        const value = targetValue(params)
        const icon = value.length > 0 ? 'close' : 'search'
        return R.merge(state, {value, icon})
      case 'CLICK':
        return R.merge(state, {value: '', icon: 'search'})
      default:
        return state
    }
  },

  view ({placeholder, icon, value}, dispatch) {
    return h('x-stay-focused-on', {props: {select: 'input'}}, [
      h(`div.container`, [
        h(`input.input`, {
          on: {keyup: dispatch('VALUE')},
          props: {type: 'text', placeholder, value}
        }),
        h('button.icon-button', {on: {click: dispatch('CLICK')}}, [
          h('i.material-icons', [icon])
        ])
      ])
    ])
  }
}
