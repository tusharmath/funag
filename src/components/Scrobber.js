/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from 'cycle-snabbdom'
import R from 'ramda'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'
import {Pallete} from '../utils/Themes'
import RAFThrottle from '../utils/RAFThrottle'

const view = ({transition$, translate$}) => {
  return O.combineLatest(transition$, translate$).map(([transition, translate]) =>
    div([
      div({style: {height: '4px', width: '100%'}}, [
        div('.scrobber-container', {
          style: {
            transition: transition ? 'transform 100ms linear' : null,
            transform: `translateX(${translate})`,
            willChange: 'transform',
            ...F.RowRight,
            background: Pallete.primaryDarkColor,
            height: '100%',
            transformOrigin: 'left',
            marginRight: '15px'
          }
        }, [
          div('.scrobber', {
            style: {
              ...{...S.block(15), borderRadius: '20px'},
              backgroundColor: Pallete.accentColor,
              transform: 'translateY(-50%) translateX(100%)',
              boxShadow: Pallete.shadow
            }
          })
        ])
      ])
    ]))
}

const width = x => R.head(x).getBoundingClientRect().width

const intent = ({DOM}) => {
  const scrobberEL = DOM.select('.scrobber')
  const scrobberContainerEL = DOM.select('.scrobber-container')
  const container$ = scrobberContainerEL.observable
  const touchStart$ = scrobberEL.events('touchstart')
  const touchEnd$ = scrobberEL.events('touchend')
  const touchMove$ = scrobberEL.events('touchmove')
  const event$ = O.merge(touchEnd$, touchStart$, touchMove$)
    .map(target => ({target, event: 'preventDefault'}))
  return {event$, touchStart$, touchEnd$, touchMove$, container$}
}

const model = ({completion$, touchStart$, touchEnd$, touchMove$, container$}) => {
  const throttledMove$ = RAFThrottle(mux({start: touchStart$, end: touchEnd$, move: touchMove$}))
  const width$ = container$.map(width).take(1)
  const clientX = R.compose(R.prop('clientX'), R.head, R.prop('changedTouches'))
  const transition$ = O.merge(touchStart$.map(false), touchEnd$.map(true)).startWith(true)
  const seek$ = throttledMove$.map(clientX).withLatestFrom(width$, R.compose(R.clamp(0, 1), R.divide))
  const translate$ = O.merge(completion$, seek$)
    .distinctUntilChanged()
    .map(completion => 100 * completion - 100)
    .startWith(-100)
    .map(x => x + '%')

  return {seek$, transition$, translate$}
}

export default ({completion$, DOM}) => {
  const {event$, touchStart$, touchEnd$, touchMove$, container$} = intent({DOM})
  const vTree$ = view(model({completion$, touchStart$, touchEnd$, touchMove$, container$}))
  return {
    DOM: vTree$,
    event$: event$
  }
}
