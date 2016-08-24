'use strict'

import {Observable} from 'rx'
import R from 'ramda'

export const DEFAULT = -1
export const PLAYING = 0
export const PAUSED = 1
export const SEEKING = 2

const isRequired = x =>
  ['reallyPlaying', 'pause', 'loadStart', 'ended'].includes(x)
const status = R.curry((id, track) => track.id === id ? PAUSED : DEFAULT)
const toObj = R.map(R.zipObj(['status', 'track']))
export const getStatus$ = ({selectedTrackId$, audio$, tracks$, isSeeking$}) => {
  const getStatus = ([event, id, tracks, seeking]) => tracks
    .map(track => {
      const isSelected = track.id === id
      const isSeeking = [isSelected, seeking].every(Boolean)
      const isPlaying = [isSelected, event === 'reallyPlaying'].every(Boolean)
      if (isSeeking) return {status: SEEKING, track}
      if (isPlaying) return {status: PLAYING, track}
      const isPaused = [isSelected, ['pause', 'loadStart'].includes(event)]
        .every(Boolean)
      if (isPaused) return {status: PAUSED, track}
      return {status: DEFAULT, track}
    })

  const requiredAudio$ = audio$.pluck('event').filter(isRequired)
  const getInitialStatus = ([tracks, status]) =>
    toObj(R.zip(status(tracks), tracks))
  const iniStatus$ = tracks$
    .combineLatest(selectedTrackId$.map(R.compose(R.map, status, R.nthArg(0))))
    .map(getInitialStatus).takeUntil(requiredAudio$)
  const status$ = Observable.combineLatest(
    requiredAudio$,
    selectedTrackId$,
    tracks$,
    isSeeking$.startWith(false)
  ).map(getStatus)
  return Observable.merge(iniStatus$, status$)
}
