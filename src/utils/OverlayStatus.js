'use strict'

import {Observable} from 'rx'

export const DEFAULT = -1
export const PLAYING = 0
export const PAUSED = 1

// TODO: Use numbers instead of strings to represent states
export const getStatus$ = ({selectedTrackId$, audio$, tracks$}) => {
  const getStatus = ([event, id, track]) => {
    const trackId = track.id
    const isSelected = trackId === id
    if ([isSelected, event === 'reallyPlaying'].every(Boolean)) {
      return PLAYING
    }
    if ([isSelected, ['pause', 'loadStart'].includes(event)].every(Boolean)) {
      return PAUSED
    }
    return DEFAULT
  }

  const iniStatus$ = tracks$.map(tracks => tracks.map(track => ({trackInfo: track, status: DEFAULT}))).first()
  const isRequired = x => ['reallyPlaying', 'pause', 'loadStart', 'ended'].includes(x)
  const requiredAudio$ = audio$.pluck('event').filter(isRequired).startWith('loadStart')
  const status$ = Observable.combineLatest(requiredAudio$, selectedTrackId$.startWith(0), tracks$)
    .map(([event, id, tracks]) =>
      tracks
        .map(track => ({
          trackInfo: track,
          status: getStatus([event, id, track])
        })))
  return Observable.merge(iniStatus$, status$)
}
