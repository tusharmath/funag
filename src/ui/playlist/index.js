/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div, ul, li, a} from '@cycle/dom'
import * as F from '../../Utils/Flexbox'
import {Visualizer} from './SoundVisualizerIcon'

const Index = index => div({
  style: {
    color: '#555',
    width: '100%',
    fontSize: '0.8em',
    padding: '14px 0', ...F.ColCenter
  }
}, [index])

const PlayListItem = (route, {song, artist, duration, playing}, index) => {
  const activeSTY = {backgroundColor: '#fff', color: '#000'}
  const defaultStyle = {fontSize: '0.8em', fontWeight: 600, ...F.RowLeft, alignItems: 'center', padding: '0 10px'}


  const isSelected = route.id === index.toString()
  return a({
    href: reverseAppend({...route, body: `/tracks/${index}`,}),
    style: {
      textDecoration: 'none'
    }
  }, [
    div({style: isSelected ? {...defaultStyle, ...activeSTY} : defaultStyle}, [
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
        div({style: {color: isSelected ? '#000' : '#fff'}}, song),
        div({style: {marginLeft: '1em', color: '#555', flexGrow: 1}}, artist),
        div({style: {marginLeft: '1em', color: '#555'}}, duration)
      ])
    ])
  ])
}
export default ({route}) => {
  const list = [
    {song: 'Halo', artist: 'Beyonce', duration: '4:21'},
    {song: 'Beautiful ft. Colby O\'Donis', artist: 'Akon', duration: '3:23'},
    {song: 'The Call', artist: 'Backstreet Boys', duration: '6:21'},
    {song: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', duration: '3:58'},
    {song: 'Didi', artist: 'Khaled', duration: '3:58', playing: true}
  ]

  return {
    DOM: Observable.combineLatest(Observable.just(list), route.match('/((*head)/tracks/:id(/*tail))(search/:search)'), (list, route) => ({
        list, route
      }))
      .map(x => x.list.map(PlayListItem.bind(null, x.route)))
      .map(x => div(x))
  }
}

const reverseAppend = ({head, body, tail, search}) => {
  return '/#/' + [search ? `search/${search}` : null, head, body, tail].filter(Boolean).join('')
}