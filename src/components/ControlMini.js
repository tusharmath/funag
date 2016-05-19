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

const ControlSTY = ({bottom, transition, show}) => {
  return {
    ...S.fixed({bottom: 0, left: 0, right: 0}),
    transform: show ? 'translateY(0%)' : 'translateY(105%)',
    opacity: 1,
    transition: transition || 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1)'
  }
}

const intent = ({DOM}) => ({
  click$: DOM.select('.controls').events('click')
})

const model = ({selectedTrack$}) => {
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {showControls$}
}

export const view = ({playback, scrobber, showControls$, control$}) => {
  const hide$ = control$.filter(x => x !== 'MINI').map(div())
  const show$ = Observable
    .combineLatest(control$, scrobber.DOM, playback.DOM, showControls$)
    .filter(x => x[0] === 'MINI')
    .map(([, scrobber, playback, show]) =>
      div({
        className: 'controls',
        style: ControlSTY({show})
      },
        div({
          style: {
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
            backgroundColor: 'rgb(246, 246, 246)'
          }
        }, [scrobber, playback]))
    )
  return Observable.merge(show$, hide$)
}

export default ({audio, selectedTrack$, DOM, completion$, control$}) => {
  const playback = Playback({selectedTrack$, audio, DOM})
  const scrobber = Scrobber({completion$})
  const {click$} = intent({DOM})
  const {showControls$} = model({selectedTrack$})
  return {
    audio$: playback.audio$,
    DOM$: view({playback, scrobber, showControls$, control$}).distinctUntilChanged(),
    event$: playback.event$,
    click$
  }
}

