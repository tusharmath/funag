/**
 * Created by imamudin.naseem on 16/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import PlaybackButtonsLarge from './PlaybackButtonsLarge'
import PlaybackInfo from './PlaybackInfo'
import Playtime from './Playtime'

const model = ({playbackBtns, scrobber, selectedTrack$, playbackInfo, playtime}) => {
  return {
    m$: Observable.combineLatest(playbackBtns.DOM, scrobber.DOM, playtime.DOM, (playbackBtns, scrobber, playtime) => ({
      playbackBtns,
      scrobber,
      playtime
    }))
      .distinctUntilChanged()
      .withLatestFrom(selectedTrack$, playbackInfo.DOM, (control, selectedTrack, info) => ({
        ...control,
        selectedTrack,
        info
      }))

  }
}

const view = ({m$, state$}) => {
  const delete$ = state$.filter(x => x === 2).map(div())
  const animationClass = ['slide-up', 'slide-down']
  const vTree$ = m$
    .combineLatest(state$)
    .filter(([, v]) => v !== 2)
    .map(([x, v]) => div({
      className: `controlLarge ${animationClass[v]}`
    }, [
      x.scrobber,
      x.playtime,
      div({
        style: {
          padding: '10px 0 10 10'
        }
      }, x.info),
      x.playbackBtns
    ]))
    .startWith(null)
  return Observable.merge(delete$, vTree$).startWith(null)
}

export const intent = ({DOM}) => ({
  click$: DOM.select('.controlLarge').events('click'),
  animationEnd$: DOM.select('.controlLarge').events('animationend')
})

export default ({audio$, selectedTrack$, DOM, completion$, timeupdate$, state$}) => {
  const {click$, animationEnd$} = intent({DOM})
  const playbackBtns = PlaybackButtonsLarge({selectedTrack$, audio$, DOM})
  const scrobber = Scrobber({completion$})
  const playbackInfo = PlaybackInfo({selectedTrack$})
  const playtime = Playtime({selectedTrack$, timeupdate$})
  const {m$} = model({playbackBtns, scrobber, selectedTrack$, playbackInfo, playtime})
  return {
    DOM$: view({m$, state$}),
    event$: playbackBtns.event$,
    audio$: playbackBtns.audio$,
    click$, animationEnd$
  }
}
