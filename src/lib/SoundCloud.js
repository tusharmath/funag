/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import qs from 'qs'

const CLIENT_ID = APP_CONFIG.soundCloud.clientID

export const clientIDParams = params => {
  return '?' + qs.stringify({...params, client_id: CLIENT_ID})
}

export const trackStreamURL = track => track.stream_url + clientIDParams({})

export const toURI = (path, params) => {
  const baseURL = APP_CONFIG.baseURI
  return `${baseURL}${path}${clientIDParams(params)}`
}

export const durationFormat = time => {
  const mins = Math.floor(time / 60000)
  const secs = Math.round((time - mins * 60000) / 1000)
  return `${mins}:${secs.toString().length < 2 ? secs + '0' : secs}`
}
