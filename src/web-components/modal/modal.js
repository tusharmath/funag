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
import {ModalHideEvent, ModalShowEvent} from './modal.events'

const config = {
  duration: 300,
  easing: 'cubic-bezier(0.5, 0.2, 0.2, 1.5)'
}
const animation = {
  enter: [
    {
      animation: FadeInAnimation(config),
      select: '.dark-overlay'
    },
    {
      animation: SlideFromBottomAnimation(config),
      select: '.slot-container'
    }
  ],
  exit: [
    {
      animation: FadeOutAnimation(config),
      select: '.dark-overlay'
    },
    {
      animation: SlideToBottomAnimation(config),
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
      animationCompleted: true
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/show':
        return state.show === params ? state : R.merge(state, {
          show: params,
          animationCompleted: false,
          action: params ? 'enter' : 'exit'
        })
      case 'OVERLAY_CLICK':
        return R.merge(state, {
          show: false,
          action: 'exit',
          animationCompleted: false
        })
      case 'ANIMATION_END':
        return [
          R.assoc('animationCompleted', true, state),
          state.show ? ModalShowEvent.of(params) : ModalHideEvent.of(params)
        ]
      default:
        return state
    }
  },
  view ({show, action, animationCompleted}, dispatch) {
    const hidden = show === false && animationCompleted === true
    return h('div', {class: {hidden}}, [
      h('div.modal-container', [
        h('fg-animate', {
          on: {[AnimationEndEvent]: dispatch('ANIMATION_END')},
          props: {action, animation: animation}
        }),
        h('div.dark-overlay', {
          on: {
            click: dispatch('OVERLAY_CLICK', {
              stopPropagation: true,
              preventDefault: true
            })
          }
        }),
        h('div.slot-container', [h('slot')])
      ])
    ])
  }
}
