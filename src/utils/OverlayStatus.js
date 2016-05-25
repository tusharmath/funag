'use strict'

import {Observable} from 'rx'

export const DEFAULT = -1
export const PLAYING = 0
export const PAUSED = 1

// TODO: Use numbers instead of strings to represent states
export const getStatus$ = ({selectedTrackId$, audio$, tracks$}) => {
  const getStatus = ([event, id, tracks]) => tracks
    .map(track => {
      const isSelected = track === id
      if ([isSelected, event === 'reallyPlaying'].every(Boolean)) {
        return PLAYING
      }
      if ([isSelected, ['pause', 'loadStart'].includes(event)].every(Boolean)) {
        return PAUSED
      }
      return DEFAULT
    })

  const iniStatus$ = tracks$.map(tracks => tracks.map(() => DEFAULT)).first()
  const isRequired = x => ['reallyPlaying', 'pause', 'loadStart', 'ended'].includes(x)
  const requiredAudio$ = audio$.pluck('event').filter(isRequired)
  const status$ = Observable.combineLatest(requiredAudio$, selectedTrackId$, tracks$).map(getStatus)
  return Observable.merge(iniStatus$, status$)
}
