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
    case 'TRACK_CHANGE':
      return R.merge(state, {selected: params.detail, showModal: true})
    case 'TRACKS':
      return setTracks(state, params)
    case 'PLAY_NOW':
      return R.merge(state, {activeTrack: state.selected, showModal: false})
    case 'MEDIA_PLAYING':
      return R.assoc('playing', true, state)
    case 'MEDIA_STOPPED':
      return R.assoc('playing', false, state)
    default:
      return state
  }
}
