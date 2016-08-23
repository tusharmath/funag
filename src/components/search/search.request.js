/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import * as SC from '../../lib/SoundCloud'

export const requestTracks = query$ => {
  return query$.map(q => SC.toURI('/tracks', {q})).map(url => ({
    url,
    category: 'tracks'
  }))
}
