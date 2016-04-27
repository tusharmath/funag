/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'

const playbackInfoSTY = {
  textTransform: 'capitalize',
  fontSize: '1em',
  fontWeight: 600,
  overflow: 'hidden',
  textAlign: 'center'
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
        div({style: S.overflowEllipsis}, [track.title]),
        div({style: {...S.overflowEllipsis, fontSize: '0.8em', color: '#555'}}, track.user.username)
      ])
    ).startWith(null)
  }
}
