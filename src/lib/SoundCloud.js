/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global fetch APP_CONFIG */
'use strict'

import qs from 'qs'

const CLIENT_ID = '1862b9bf02ed7c80d0f545f835ad8773'

export const clientIDParams = params => {
  return '?' + qs.stringify({...params, client_id: CLIENT_ID})
}

export const trackStreamURL = track => track.stream_url + clientIDParams({})

export const toURI = (path, params) => {
  const baseURL = APP_CONFIG.baseURI
  return `${baseURL}${path}${clientIDParams(params)}`
}

// TODO: DEPRECATE
export const get = (path, params) => {
  return fetch(toURI(path, params)).then(x => x.json())
}

export const durationFormat = time => {
  const mins = Math.floor(time / 60000)
  const secs = Math.round((time - mins * 60000) / 1000)
  return `${mins}:${secs.toString().length < 2 ? secs + '0' : secs}`
}

export const findTrack = ({id$, tracks$}) => {
  return id$
    .withLatestFrom(tracks$, (id, tracks) => tracks.filter(x => x.id === id)[0])
}
