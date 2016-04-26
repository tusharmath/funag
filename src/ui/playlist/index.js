/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as F from '../../utils/Flexbox'
import * as SC from '../../utils/SoundCloud'
import {overflowEllipsis, size} from '../../utils/StyleUtils'

const Artwork = url => div({
  style: {
    ...size(35, 35),
    backgroundImage: url ? `url('${url}')` : null,
    backgroundColor: 'rgb(42, 44, 49)',
    backgroundSize: '35px 35px',
    backgroundRepeat: 'no-repeat',
    marginRight: '10px'
  }
})

const PlayListItem = ({title, user, duration, artwork_url, playing, selected}, index) => {
  const activeSTY = {backgroundColor: '#fff', color: '#000'}
  const defaultStyle = {fontSize: '0.8em', fontWeight: 600, padding: '4px 10px', ...F.RowSpaceBetween}
  return div({style: selected ? {...defaultStyle, ...activeSTY} : defaultStyle}, [
    Artwork(artwork_url),
    div({style: {overflow: 'hidden', flex: '1 0 0'}}, [
      div({style: overflowEllipsis}, title),
      div({style: {color: '#555', fontSize: '0.8em', ...overflowEllipsis}}, user.username)
    ]),
    div({style: {marginLeft: '1em', color: '#555'}}, SC.durationFormat(duration))
  ])
}

export default ({tracks$}) => {
  return {
    DOM: tracks$.map(tracks => div(tracks.map(PlayListItem)))
  }
}
