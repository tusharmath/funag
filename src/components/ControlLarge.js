/**
 * Created by imamudin.naseem on 16/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import * as F from '../utils/Flexbox'
import PlaybackButtonsLarge from './PlaybackButtonsLarge'
import PlaybackInfo from './PlaybackInfo'
import Playtime from './Playtime'

const model = ({playbackBtns, scrobber, selectedTrack$, playbackInfo, playtime, show$}) =>
  Observable.combineLatest(show$, playbackBtns.DOM, scrobber.DOM, playtime.DOM, (show, playbackBtns, scrobber, playtime) => ({
    show,
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

const view = ({m$}) => {
  return m$
    .map(x => div({
      className: 'controlLarge',
      style: {
        position: 'fixed',
        bottom: 0,
        height: '50%',
        width: '100%',
        backgroundColor: '#fff',
        transition: 'all 400ms cubic-bezier(0, 0.6, 0.34, 1)',
        transform: x.show ? 'translateY(0%)' : 'translateY(100%)',
        boxShadow: x.show ? '0px 2px 6px 3px' : null,
        ...F.FlexCol
      }
    }, [
      x.playtime,
      x.scrobber,
      div({
        style: {
          padding: '10px 0 10 10',
          borderBottom: '1px solid #ededed'
        }
      }, x.info),
      x.playbackBtns
    ]))
    .startWith(null)
}

export const intent = ({DOM}) => ({
  click$: DOM.select('.controlLarge').events('click')
})

export default ({audio, selectedTrack$, DOM, completion$, timeupdate$, show$}) => {
  const {click$} = intent({DOM})
  const playbackBtns = PlaybackButtonsLarge({selectedTrack$, audio, DOM})
  const scrobber = Scrobber({completion$})
  const playbackInfo = PlaybackInfo({selectedTrack$})
  const playtime = Playtime({selectedTrack$, timeupdate$, show$})
  const m$ = model({playbackBtns, scrobber, selectedTrack$, playbackInfo, playtime, show$})
  return {
    DOM$: view({m$}),
    event$: playbackBtns.event$,
    audio$: playbackBtns.audio$,
    click$
  }
}