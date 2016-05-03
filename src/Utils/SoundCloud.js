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

export const get = (path, params) => {
  return fetch(`${baseURL}${path}${clientIDParams(params)}`).then(x => x.json())
}

export const searchTracks = partial(
  (get, q$) => q$
    .flatMapLatest(q => get('/tracks', {q}))
    .share(),
  get)

export const durationFormat = time => {
  const mins = Math.floor(time / 60000)
  const secs = Math.round((time - mins * 60000) / 1000)
  return `${mins}:${secs.toString().length < 2 ? secs + '0' : secs}`
}

export const findTrack = ({id$, tracks$}) => {
  return id$
    .withLatestFrom(tracks$, (id, tracks) => tracks.filter(x => x.id === id)[0])
}
