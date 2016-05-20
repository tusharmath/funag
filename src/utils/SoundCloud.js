/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global fetch */
'use strict'

import qs from 'qs'
import {partial} from 'funjector'

const CLIENT_ID = '1862b9bf02ed7c80d0f545f835ad8773'
const baseURL = 'https://api.soundcloud.com'

export const clientIDParams = params => {
  return '?' + qs.stringify({...params, client_id: CLIENT_ID})
}

export const toURI = (path, params) => `${baseURL}${path}${clientIDParams(params)}`

// TODO: DEPRECATE
export const get = (path, params) => {
  return fetch(toURI(path, params)).then(x => x.json())
}

// TODO: DEPRECATE
export const searchTracks = partial(
  (get, q$) => q$
    .flatMapLatest(q => get('/tracks', {q}))
    .share(),
  get)

const doubleDigit = digit => digit.toString().length < 2 ? '0' + digit : digit
export const durationFormat = (time, format = 'ms') => {
  const value = {
    ms: 1000,
    sec: 1
  }
  const mins = Math.floor(time / (60 * value[format]))
  const secs = Math.round((time - (mins * 60 * value[format])) / value[format])
  return `${doubleDigit(mins)}:${doubleDigit(secs)}`
}

export const findTrack = ({id$, tracks$}) => {
  return id$
    .withLatestFrom(tracks$, (id, tracks) => tracks.filter(x => x.id === id)[0])
}
