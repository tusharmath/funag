/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import R from 'ramda'
import {toURI} from '../../lib/SoundCloud'
import memoizeLatest from '../../lib/memoizeLatest'

export const createRequest = memoizeLatest((q) => ({
  type: 'request',
  params: {url: toURI('/tracks', {q})}
}))
export const setTracks = (state, params) => {
  return R.merge(state, {
    tracks: params.detail,
    selectedTrack: state.selectedTrack || params.detail[0],
    activeTrack: state.activeTrack || state.selectedTrack || params.detail[0]
  })
}
