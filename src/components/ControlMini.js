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

const ControlSTY = ({bottom, swipedMag, transition}) => {
  const opacity = (1 - swipedMag)
  return {
    ...S.position({bottom, left: 0, right: 0}),
    position: 'fixed',
    opacity: opacity,
    transition
  }
}
const event = event => target => ({target, event})
var bottom_ = 0
export default ({audio, selectedTrack$, DOM, completion$}) => {
  const playback = Playback({selectedTrack$, audio, DOM})
  const touchMove$ = DOM.select('.controls').events('touchmove')
  const touchEnd$ = DOM.select('.controls').events('touchend')
  const clientY$ = touchMove$.pluck('changedTouches').map(x => window.innerHeight - x[0].clientY)
  const slide$ = clientY$.map(x => {
    bottom_ = bottom_ + (x - bottom_) * 0.3
    return {bottom: bottom_, swipedMag: x / window.innerHeight}
  })
  const touchLeave$ = touchEnd$
    .withLatestFrom(slide$, (a, b) => b.swipedMag > 0.5 ? 'SWIPE-UP' : 'SWIPE-DOWN')
  const swipe$_ = D.swipe({DOM, select: '.controls'})
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

  return {
    audio$: playback.audio$,
    DOM$: Observable.combineLatest(
      Scrobber({completion$}).DOM,
      playback.DOM,
      Observable.merge(slide$, swipe$).startWith({bottom: 0})
    )
      .map(([scrobber, playback, touch]) =>
      div({
          className: 'controls',
          style: ControlSTY(touch)
        },
        div({
          style: {
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
            backgroundColor: 'rgb(246, 246, 246)'
          }
        }, [scrobber, playback]))),
    event$: touchMove$.map(event('preventDefault')),
    slide$: Observable.merge(slide$, swipe$)
  }
}
