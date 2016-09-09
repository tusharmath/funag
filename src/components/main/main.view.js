/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './main.style'
import {trackStreamURL} from '../../lib/SoundCloud'

export default ({playlist, header, track$}) => {
  return O
    .combineLatest(
      header.DOM,
      playlist.DOM,
      track$
    ).map(([header, playlist, track]) =>
      h(`div.${css.main}.flb.col`, [
        header,
        playlist,
        track ? h(`div.${css.controlsContainer}`, [
          h(`funag-mini-audio-control`, {attrs: {src: trackStreamURL(track)}}, [
            h('div', [
              h(`div.${css.trackTitle}`, [track.title]),
              h(`div.${css.trackArtist}`, [track.user.username])
            ])
          ])
        ]) : null
      ])
    )
}
