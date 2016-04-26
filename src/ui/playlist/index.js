/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as F from '../../utils/Flexbox'
import * as SC from '../../utils/SoundCloud'
import {Visualizer} from './SoundVisualizerIcon'
import {overflowEllipsis} from '../../utils/StyleUtils'

const Index = index => div({
  style: {
    color: '#555',
    width: '100%',
    fontSize: '0.8em',
    padding: '14px 0', ...F.ColCenter
  }
}, [index])

const PlayListItem = ({title, user, duration, playing, selected}, index) => {
  const activeSTY = {backgroundColor: '#fff', color: '#000'}
  const defaultStyle = {fontSize: '0.8em', fontWeight: 600, ...F.RowLeft, alignItems: 'center', padding: '0 10px'}
  return div({}, [
    div({style: selected ? {...defaultStyle, ...activeSTY} : defaultStyle}, [
      div({style: {width: '20px', marginRight: '4px', textAlign: 'center'}}, [
        playing ? Visualizer : Index(index + 1)
      ]),
      div({
        style: {
          ...F.RowLeft,
          width: '100%',
          padding: '14px 0',
          overflow: 'hidden'
        }
      }, [
        div({style: {flex: '1 0 0', overflow: 'hidden'}}, [
          div({style: overflowEllipsis}, title),
          div({style: {color: '#555', fontSize: '0.8em', ...overflowEllipsis}}, user.username)
        ]),
        div({style: {marginLeft: '1em', color: '#555'}}, SC.durationFormat(duration))
      ])
    ])
  ])
}

export default ({tracks$}) => {
  return {
    DOM: tracks$.map(tracks => div(tracks.map(PlayListItem)))
  }
}
