/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import FadeInAnimation from '../animation/fade-in-animation'
import FadeOutAnimation from '../animation/fade-out-animation'
import SlideFromBottomAnimation from '../animation/slide-from-bottom-animation'
import SlideToBottomAnimation from '../animation/slide-to-bottom-animation'
import {AnimationEndEvent} from '../animation/animation-events'
import Value from '../../lib/value'

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

const DAMPED = {
  stopPropagation: true,
  preventDefault: true
}

export default (state, dispatch) => {
  const {show, action, animationCompleted, translateY, opacity} = state
  const hidden = show === false && animationCompleted === true
  return h('div', {class: {hidden}}, [
    h('div.modal-container', [
      h('fg-animate', {
        on: {[AnimationEndEvent]: dispatch('ANIMATION_END')},
        props: {action: Value.of(action), animation: animation}
      }),
      h('div.dark-overlay', {
        style: {opacity},
        on: {
          click: dispatch('OVERLAY_CLICK', DAMPED)
        }
      }),
      h('div.slot-container', {
        hook: {insert: dispatch('INSERTED')},
        style: {transform: `translateY(${translateY}%)`},
        on: {
          touchmove: dispatch('MOVE', DAMPED),
          touchstart: dispatch('START', DAMPED),
          touchend: dispatch('END', DAMPED)
        }
      }, [h('slot')])
    ])
  ])
}
