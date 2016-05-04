/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'
import * as F from '../../Utils/Flexbox'
import * as T from '../../Utils/Themes'
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
