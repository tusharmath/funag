/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'
import * as F from '../../Utils/Flexbox'
import TrackDuration from './TrackDuration'

export default ({title, user, duration}) =>
  div({
    style: {
      flex: '1 0 0',
      overflow: 'hidden', ...F.RowSpaceBetween,
      marginLeft: '10px',
      alignItems: 'center'
    }
  }, [
    div({style: {overflow: 'hidden', marginRight: '10px'}}, [
      div({style: S.overflowEllipsisSTY}, title),
      div({style: {...S.subtitleSTY, ...S.overflowEllipsisSTY}}, user.username)
    ]),
    TrackDuration(duration)
  ])
