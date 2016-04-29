/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'
import * as T from '../../Utils/Themes'

const playbackInfoSTY = {
  textTransform: 'capitalize',
  fontSize: '1em',
  fontWeight: '600',
  overflow: 'hidden',
  paddingRight: '10px'
}
export default ({selectedTrack$}) => {
  const init = {
    title: ' ',
    user: {username: ' '},
    genre: ' '
  }
  return {
    DOM: selectedTrack$.startWith(init).map(track =>
      div({style: playbackInfoSTY}, [
        div({style: S.overflowEllipsisSTY}, [track.title]),
        div({style: {...S.overflowEllipsisSTY, fontSize: '0.8em', color: T.font.secondary}}, track.user.username)
      ])
    ).startWith(null)
  }
}
