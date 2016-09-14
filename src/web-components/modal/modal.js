/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import FadeInAnimation from '../animation/fade-in-animation'
import FadeOutAnimation from '../animation/fade-out-animation'
import SlideFromBottomAnimation from '../animation/slide-from-bottom-animation'
import SlideToBottomAnimation from '../animation/slide-to-bottom-animation'
import {AnimationEndEvent} from '../animation/animation-events'
import value from '../../lib/value'

const duration = 300
const animation = {
  enter: [
    {
      animation: FadeInAnimation({duration}),
      select: '.dark-overlay'
    },
    {
      animation: SlideFromBottomAnimation({duration}),
      select: '.slot-container'
    }
  ],
  exit: [
    {
      animation: FadeOutAnimation({duration}),
      select: '.dark-overlay'
    },
    {
      animation: SlideToBottomAnimation({duration}),
      select: '.slot-container'
    }
  ]
}

export default {
  props: ['show'],
  init () {
    return {
      action: null,
      show: false,
      actionCompleted: false
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/show':
        return R.merge(state, {
          show: params,
          action: 'enter',
          actionCompleted: false
        })
      case 'OVERLAY_CLICK':
        return R.merge(state, {
          show: false,
          action: 'exit',
          actionCompleted: false
        })
      case 'ANIMATION_END':
        return R.assoc('actionCompleted', true, state)
      default:
        return state
    }
  },
  view ({show, action, actionCompleted}, dispatch) {
    const hidden = show === false && actionCompleted === true
    return h('div', {class: {hidden}}, [
      h('div.modal-container', [
        !show ? '' : h('fg-disable-scroll'),
        h('fg-animate', {
          on: {[AnimationEndEvent]: dispatch('ANIMATION_END')},
          props: {action: value.of(action), animation: animation}
        }),
        h('div.dark-overlay', {
          on: {click: dispatch('OVERLAY_CLICK', {stopPropagation: true})}
        }),
        h('div.slot-container', [h('slot')])
      ])
    ])
  }
}
