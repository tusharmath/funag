/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import TrackDuration from '../track-duration/track-duration'
import css from './track-details.style'
import {h} from '@cycle/dom'

export default ({title, user, duration}) =>
  h(`div.${css.trackDetailContainer}.flb.row.js_sb.ai_c`,
    [h(`div.${css.trackDetail}`,
      [h(`div.${css.title}`, [title]),
        h(`div.${css.artist}`, [user.username]),
        TrackDuration(duration)]
    )]
  )
