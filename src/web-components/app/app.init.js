/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import {MediaStatus} from '../../lib/MediaStatus'
export default () => {
  return {
    tracks: [],
    selectedTrack: null,
    activeTrack: null,
    mediaStatus: MediaStatus.LOADING,
    completion: 0,
    audioAction: {},
    search: '',
    showModal: false
  }
}
