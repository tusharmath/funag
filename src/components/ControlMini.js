/**
 * Created by imamudin.naseem on 17/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import * as S from '../utils/StyleUtils'
import {Pallete} from '../utils/Themes'

const ControlSTY = () => ({
  ...S.fixed({bottom: 0, left: 0, right: 0}),
  backgroundColor: Pallete.primaryColor,
  color: '#FFF'
})

const intent = ({DOM}) => ({
  click$: DOM.select('.controlMini').events('click'),
  animationEnd$: DOM.select('.controlMini').events('animationend')
})

const model = ({selectedTrack$, state$}) => {
  const showControls$ = Observable.merge(selectedTrack$.map(0), state$.startWith(2))
  return {showControls$}
}

const view = ({playback, scrobber, showControls$}) => {
  const delete$ = showControls$.filter(x => x === 2).map(div())
  const animationClass = ['pop-up', 'slide-down']
  const show$ = Observable
    .combineLatest(
      showControls$,
      scrobber.DOM,
      playback.DOM
    )
    .filter(([s, , ]) => s !== 2)
    .map(([show, scrobber, playback]) =>
      div({
        className: `controlMini ${animationClass[show]}`
        //style: ControlSTY()
      }, [
        div({
          style: {
            boxShadow: Pallete.shadow
          }
        }, [scrobber, playback])])
    )
  return Observable.merge(delete$, show$)
}

export default ({audio$, selectedTrack$, DOM, completion$, state$}) => {
  const playback = Playback({selectedTrack$, audio$, DOM})
  const scrobber = Scrobber({completion$})
  const {click$, animationEnd$} = intent({DOM})
  const {showControls$} = model({selectedTrack$, state$})
  return {
    audio$: playback.audio$,
    DOM$: view({playback, scrobber, showControls$}),
    event$: playback.event$,
    click$,animationEnd$
  }
}

