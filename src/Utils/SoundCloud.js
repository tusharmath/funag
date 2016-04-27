/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import qs from 'qs'

const client_id = '1862b9bf02ed7c80d0f545f835ad8773'
const baseURL = 'https://api.soundcloud.com'

export const clientIDParams = params => {
  return '?' + qs.stringify({...params, client_id})
}

export const get = (path, params) => {
  return fetch(`${baseURL}${path}${clientIDParams(params)}`).then(x => x.json())
}

export const searchTracks = q$ => {
  return q$.debounce(500)
    .flatMap(q => get('/tracks', {q}))
    .share()
}

export const durationFormat = time => {
  const mins = Math.floor(time / 60000)
  const secs = Math.round((time - mins * 60000) / 1000)
  return `${mins}:${secs}`
}
