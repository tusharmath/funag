/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'
import * as T from '../utils/Themes'
import TrackDuration from './TrackDuration'

export default ({title, user, duration}) =>
  div({
    style: {
      flex: '1 0 0',
      overflow: 'hidden', ...F.RowSpaceBetween,
      marginRight: `${T.BlockSpace}px`,
      alignItems: 'center'
    }
  }, [
    div({style: {overflow: 'hidden', marginRight: `${T.BlockSpace}px`}}, [
      div({style: S.overflowEllipsisSTY}, title),
      div({style: {...S.subtitleSTY, ...S.overflowEllipsisSTY}}, user.username)
    ]),
    TrackDuration(duration)
  ])
