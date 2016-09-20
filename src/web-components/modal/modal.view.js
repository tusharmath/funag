/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import {DragEvent} from '../draggable/draggable.events'
import {AnimationEndEvent} from '../animation/animation-events'
import FadeInAnimation from '../animation/fade-in-animation'
import FadeOutAnimation from '../animation/fade-out-animation'
import SlideFromBottomAnimation from '../animation/slide-from-bottom-animation'
import SlideToBottomAnimation from '../animation/slide-to-bottom-animation'

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
  const {
    show,
    translateY,
    opacity,
    isMoving,
    animationStatus,
    animationCompleted
  } = state
  const hidden = show === false && animationCompleted === true
  return h('div', {class: {hidden, 'no-anime': isMoving}}, [
    h('fg-animate', {
      on: {[AnimationEndEvent]: dispatch('ANIMATION_END')},
      props: {action: animationStatus, animation}
    }),
    h('div.modal-container', [
      h('div.dark-overlay', {
        style: {opacity: opacity.toString()},
        on: {
          click: dispatch('OVERLAY_CLICK', DAMPED)
        }
      }),
      h('div.slot-container', {
        style: {transform: `translateY(${translateY}%)`},
        hook: {insert: dispatch('INSERTED')}
      }, [
        h('fg-enhanced-drag', {on: {[DragEvent]: dispatch('DRAG')}}, [
          h('slot')
        ])
      ])
    ])
  ])
}
