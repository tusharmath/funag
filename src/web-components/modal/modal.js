/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import value from '../../lib/value'
import FadeInAnimation from '../animation/fade-in-animation'
import FadeOutAnimation from '../animation/fade-out-animation'
import SlideFromBottomAnimation from '../animation/slide-from-bottom-animation'
import SlideToBottomAnimation from '../animation/slide-to-bottom-animation'

export default {
  props: ['show'],
  init () { return {show: false} },
  update (state, {type, params}) {
    console.log(type)
    switch (type) {
      case '@@rwc/prop/show':
        return R.assoc('show', value.get(params), state)
      case 'OVERLAY_CLICK':
        return R.assoc('show', false, state)
      default:
        return state
    }
  },
  view ({show}, dispatch) {
    return h('div', [
      h('div.modal-container', {class: {hidden: !show}}, [
        !show ? '' : h('fg-disable-scroll'),
        h('fg-animate', {
          props: {
            show: value.of(show),
            enterAnimation: FadeInAnimation,
            exitAnimation: FadeOutAnimation
          }
        }, [
          h('div.dark-overlay', {
            on: {click: dispatch('OVERLAY_CLICK', {stopPropagation: true})}
          })
        ]),
        h('fg-animate', {
          props: {
            show: value.of(show),
            enterAnimation: SlideFromBottomAnimation,
            exitAnimation: SlideToBottomAnimation
          }
        }, [h('div.slot-container', [h('slot')])])
      ])
    ])
  }
}
