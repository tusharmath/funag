/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from 'cycle-maquette'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'

const playbackInfoSTY = {
  'text-transform': 'capitalize',
  'font-size': '1em',
  'font-weight': '600',
  'overflow': 'hidden',
  'padding-right': `${T.BlockSpace}px`
}
export default ({selectedTrack$}) => {
  return {
    DOM: selectedTrack$.map(track =>
      div({style: S.stringifyStyle(playbackInfoSTY)}, [
        div({style: S.stringifyStyle(S.overflowEllipsisSTY)}, [track.title]),
        div({style: S.stringifyStyle({...S.overflowEllipsisSTY, 'font-size': '0.8em', color: T.Pallete.primaryColorSecondaryFont})}, track.user.username)
      ])
    ).startWith(null)
  }
}
