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

const ControlSTY = show => ({
  ...S.fixed({bottom: 0, left: 0, right: 0}),
  transform: show ? 'translateY(0%)' : 'translateY(105%)',
  transition: 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.5)',
  backgroundColor: Pallete.primaryColor,
  color: '#FFF'
})

const intent = ({DOM}) => ({
  click$: DOM.select('.controls').events('click')
})

const model = ({selectedTrack$}) => {
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {showControls$}
}

const view = ({playback, scrobber, showControls$}) => {
  return Observable
    .combineLatest(
      showControls$,
      scrobber.DOM,
      playback.DOM
    )
    .map(([show, scrobber, playback]) =>
      div({
        className: 'controls',
        style: ControlSTY(show)
      }, [
        div({
          style: {
            boxShadow: Pallete.shadow
          }
        }, [scrobber, playback])])
    )
}

export default ({audio$, selectedTrack$, DOM, completion$}) => {
  const playback = Playback({selectedTrack$, audio$, DOM})
  const scrobber = Scrobber({completion$})
  const {click$} = intent({DOM})
  const {showControls$} = model({selectedTrack$})
  return {
    audio$: playback.audio$,
    DOM$: view({playback, scrobber, showControls$}).distinctUntilChanged(),
    event$: playback.event$,
    click$
  }
}

