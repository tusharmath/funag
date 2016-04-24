/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div, ul, li} from '@cycle/dom'
import * as F from '../../lib/Flexbox'
import {Visualizer} from './SoundVisualizerIcon'

const Index = index => div({
  style: {
    color: '#555',
    width: '100%',
    fontSize: '0.8em',
    padding: '14px 0', ...F.ColCenter
  }
}, [index])

const PlayListItem = ({song, artist, duration, index, playing, selected}) => {
  const activeSTY = {backgroundColor: '#fff', color: '#000'}
  const defaultStyle = {fontSize: '0.8em', fontWeight: 600, ...F.RowLeft, alignItems: 'center', padding: '0 10px'}

  return div({}, [
    div({style: selected ? {...defaultStyle, ...activeSTY} : defaultStyle}, [
      div({style: {width: '20px', marginRight: '4px', textAlign: 'center'}}, [
        playing ? Visualizer : Index(index)
      ]),
      div({
        style: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)', ...F.RowLeft,
          width: '100%',
          padding: '14px 0'
        }
      }, [
        div(song),
        div({style: {marginLeft: '1em', color: '#555', flexGrow: 1}}, artist),
        div({style: {marginLeft: '1em', color: '#555'}}, duration)
      ])
    ])
  ])
}

export default () => {
  return {
    DOM: Observable.just(
      div([
        PlayListItem({song: 'Halo', artist: 'Beyonce', duration: '4:21', index: 1}),
        PlayListItem({song: 'Beautiful ft. Colby O\'Donis', artist: 'Akon', duration: '3:23', index: 2}),
        PlayListItem({song: 'The Call', artist: 'Backstreet Boys', duration: '6:21', index: 3, selected: true}),
        PlayListItem({song: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', duration: '3:58', index: 4}),
        PlayListItem({song: 'Didi', artist: 'Khaled', duration: '3:58', index: 5, playing: true})
      ])
    )
  }
}
