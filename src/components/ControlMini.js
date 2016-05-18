/**
 * Created by imamudin.naseem on 17/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import * as S from '../utils/StyleUtils'
import * as D from '../utils/DOMUtils'

const ControlSTY = ({bottom, swipedMag, transition, show}) => {
  const opacity = (1 - swipedMag)
  return {
    ...S.fixed({bottom, left: 0, right: 0}),
    transform: show ? 'translateY(0%)' : 'translateY(105%)',
    opacity: opacity,
    transition: transition || 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1)'
  }
}

const event = event => target => ({target, event})
var bottom_ = 0

const intent = ({DOM}) => ({
  touchMove$: DOM.select('.controls').events('touchmove'),
  touchEnd$: DOM.select('.controls').events('touchend')
})

const model = ({touchMove$, touchEnd$, swipe$_, selectedTrack$}) => {
  const clientY$ = touchMove$.pluck('changedTouches').map(x => window.innerHeight - x[0].clientY)
  const swipedMag$ = clientY$.map(x => x / window.innerHeight)
  const slideStyle$ = clientY$
    .withLatestFrom(swipedMag$)
    .map(([clientY, swipedMag]) => {
      bottom_ = bottom_ + (clientY - bottom_) * 0.3
      return {bottom: bottom_, transition: 'none', swipedMag}
    })
  const touchLeave$ = touchEnd$
    .withLatestFrom(swipedMag$, (a, b) => b > 0.5 ? 'SWIPE-UP' : 'SWIPE-DOWN')
  const swipe$ = Observable.merge(touchLeave$, swipe$_)
    .map(x => x === 'SWIPE-UP' ? {
      bottom: window.innerHeight - 62,
      swipedMag: 1,
      transition: 'bottom 200ms cubic-bezier(0, 0.6, 0.34, 1)'
    } : {
      bottom: 0,
      transition: 'bottom 200ms cubic-bezier(0, 0.6, 0.34, 1)',
      swipedMag: 0
    })
    .tap(x => bottom_ = x.bottom)
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {slideStyle$, swipe$, showControls$}
}

export const view = ({slideStyle$, swipe$, playback, scrobber, showControls$}) =>
  Observable.combineLatest(
    scrobber.DOM,
    playback.DOM,
    Observable.merge(slideStyle$, swipe$).startWith({bottom: 0}),
    showControls$
    )
    .map(([scrobber, playback, touch, show]) =>
      div({
          className: 'controls',
          style: ControlSTY({...touch, show})
        },
        div({
          style: {
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
            backgroundColor: 'rgb(246, 246, 246)'
          }
        }, [scrobber, playback])))

export default ({audio, selectedTrack$, DOM, completion$}) => {
  const playback = Playback({selectedTrack$, audio, DOM})
  const scrobber = Scrobber({completion$})
  const {touchMove$, touchEnd$} = intent({DOM})
  const swipe$_ = D.swipe({DOM, select: '.controls'})
  const {slideStyle$, swipe$, showControls$} = model({touchMove$, touchEnd$, swipe$_, selectedTrack$})
  return {
    audio$: playback.audio$,
    DOM$: view({slideStyle$, swipe$, playback, scrobber, showControls$}),
    event$: touchMove$.map(event('preventDefault')),
    slide$: Observable.merge(slideStyle$, swipe$)
  }
}

