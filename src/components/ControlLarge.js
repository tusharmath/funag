/**
 * Created by imamudin.naseem on 16/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import * as F from '../utils/Flexbox'
import * as A from './Artwork'
import ArtWork from './ArtWork'
import PlaybackButtons from './PlaybackButtons'
import PlaybackInfo from './PlaybackInfo'

const model = ({playbackBtns, scrobber, selectedTrack$, playbackInfo}) =>
  Observable.combineLatest(playbackBtns.DOM, scrobber.DOM, (playbackBtns, scrobber) => ({
    playbackBtns,
    scrobber
  }))
    .withLatestFrom(selectedTrack$, playbackInfo.DOM, (control, selectedTrack, info) => ({
      ...control,
      selectedTrack,
      info
    }))

const view = ({m$, control$, selectedTrack$}) => {
  const show$ = control$.map(x => x === 'LARGE')
  return Observable
    .combineLatest(show$, m$, (show, m) => ({show, m}))
    .withLatestFrom(selectedTrack$, (a, selectedTrack) => ({...a, selectedTrack}))
    .map(x => div({
      className: 'controlLarge',
      style: {
        position: 'fixed',
        top: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        transition: 'all 200ms cubic-bezier(0, 0.6, 0.34, 1)',
        transform: x.show ? 'translateY(0%)' : 'translateY(100%)',
        ...F.FlexCol
      }
    }, [
      div({
        style: {
          position: 'absolute',
          width: '100%',
          height: '60%',
          filter: 'blur(5px)',
          '-webkitFilter': 'blur(5px)',
          overflow: 'hidden'
        }
      }, [
        x.selectedTrack.artwork_url ? A.ArtWorkLarge(x.selectedTrack.artwork_url) : A.DefaultArtWorkLarge
      ]),
      div({
        style: {height: '60%', position: 'relative', ...F.RowMiddle}
      }, [
        x.selectedTrack.artwork_url ? ArtWork(x.selectedTrack.artwork_url, 100) : A.DefaultArtwork(100)
      ]),
      div({
        style: {
          padding: '10px 0 10 10',
          borderBottom: '1px solid #ededed',
          marginTop: '10px'
        }
      }, x.m.info),
      x.m.scrobber,
      div({style: {...F.RowMiddle, flex: '1 0 0'}}, x.m.playbackBtns)
    ]))
    .tap(x => console.log('HELL-LARGE'))
    .startWith(null)
}

export const intent = ({DOM}) => ({
  click$: DOM.select('.controlLarge').events('click')
})

export default ({audio, selectedTrack$, DOM, completion$, control$}) => {
  const {click$} = intent({DOM})
  const playbackBtns = PlaybackButtons({selectedTrack$, audio, DOM})
  const scrobber = Scrobber({completion$})
  const playbackInfo = PlaybackInfo({selectedTrack$})
  const m$ = model({playbackBtns, scrobber, selectedTrack$, playbackInfo})
  return {
    DOM$: view({m$, control$, selectedTrack$, scrobber, playbackInfo}),
    event$: playbackBtns.event$,
    audio$: playbackBtns.audio$,
    click$
  }
}
