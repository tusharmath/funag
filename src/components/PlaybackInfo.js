/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import R from 'ramda'
import * as S from '../lib/StyleUtils'
import * as T from '../lib/Themes'

const playbackInfoSTY = {
  textTransform: 'capitalize',
  fontSize: '1rem',
  fontWeight: '600',
  overflow: 'hidden',
  paddingRight: `${T.BlockSpace}px`
}
export default ({STORE}) => {
  const selectedTrack$ = STORE.select('track.selected').filter(Boolean)
  return {
    DOM: selectedTrack$.map(track =>
      div({style: playbackInfoSTY}, [
        div({style: S.overflowEllipsisSTY}, [track.title]),
        div({
          style: R.merge(S.overflowEllipsisSTY, {
            fontSize: '0.8rem',
            color: T.Palette.fg__playbackInfo__light
          })
        }, track.user.username)
      ])
    ).startWith('')
  }
}
