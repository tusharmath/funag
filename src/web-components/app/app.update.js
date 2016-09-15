/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import R from 'ramda'
import {setTracks} from './app.utils'

export default (state, {type, params}) => {
  switch (type) {
    case `SEARCH`:
      return R.merge(state, {search: params.detail, tracks: []})
    case 'SELECT_TRACK':
      return R.merge(state, {selectedTrack: params.detail, showModal: true})
    case 'HTTP_TRACKS_RESPONSE':
      return setTracks(state, params)
    case 'PLAY':
      return R.merge(state, {
        activeTrack: state.selectedTrack,
        showModal: false,
        audioAction: 'play'
      })
    case 'PAUSE':
      return R.merge(state, {audioAction: 'pause'})
    default:
      return state
  }
}
