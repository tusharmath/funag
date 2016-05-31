'use strict'

import {Observable} from 'rx'

export const DEFAULT = -1
export const PLAYING = 0
export const PAUSED = 1

export const getStatus$ = ({selectedTrackId$, audio$, tracks$}) => {
  const getStatus = ([event, id, tracks]) => tracks
    .map(track => {
      const isSelected = track.id === id
      if ([isSelected, event === 'reallyPlaying'].every(Boolean)) return {status: PLAYING, track}
      if ([isSelected, ['pause', 'loadStart'].includes(event)].every(Boolean)) return {status: PAUSED, track}
      return {status: DEFAULT, track}
    })

  const iniStatus$ = tracks$.map(tracks => tracks.map(track => ({status: DEFAULT, track}))).first()
  const isRequired = x => ['reallyPlaying', 'pause', 'loadStart', 'ended'].includes(x)
  const requiredAudio$ = audio$.pluck('event').filter(isRequired)
  const status$ = Observable.combineLatest(requiredAudio$.startWith('pause'), selectedTrackId$, tracks$).map(getStatus)
  return Observable.merge(iniStatus$, status$)
}
