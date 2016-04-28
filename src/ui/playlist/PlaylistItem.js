/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div, span} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import * as SC from '../../Utils/SoundCloud'
import {overflowEllipsisSTY, size, subtitleSTY} from '../../Utils/StyleUtils'
import {Visualizer} from './SoundVisualizerIcon'

const Artwork = url => div({
  style: {
    ...size(35, 35),
    backgroundImage: url ? `url('${url}')` : null,
    backgroundColor: 'rgb(42, 44, 49)',
    backgroundSize: '35px 35px',
    backgroundRepeat: 'no-repeat'
  }
})
const Index = index => div({style: {...subtitleSTY, width: '35px', textAlign: 'center'}}, [index + 1])

const TrackDuration = duration =>
  div({style: {color: '#555', fontSize: '0.8em', padding: '0 10px'}}, SC.durationFormat(duration))

const TrackDetail = ({artist, title}) =>
  div({style: {overflow: 'hidden'}}, [
    div({style: overflowEllipsisSTY}, title),
    div({style: {...subtitleSTY, ...overflowEllipsisSTY}}, artist)
  ])

const playListItemSTY = {
  fontSize: '1em',
  fontWeight: 600,
  alignItems: 'center',
  ...F.RowSpaceBetween
}

export default ({DOM, track: {title, user, duration, artwork_url, id}, trackListClick$, isPlaying$}, index) => {
  const click$ = DOM.select('.playlist-item').events('click').map(id)
  const isSelected$ = Observable.merge(trackListClick$.map(false), click$.map(true)).startWith(false)
  const track$ = Observable.combineLatest(isPlaying$, isSelected$, (isPlaying$, isSelected$) => [isPlaying$, isSelected$].every(Boolean))
    .distinctUntilChanged()
  const isTrackPlaying$ = track$.filter(x => x).map(() => div({style: {height: '35px', width: '35px', ...F.RowMiddle}}, [Visualizer]))
  const isTrackNotPlaying$ = track$.filter(x => !x).map(() => Index(index))
  return {
    click$,
    DOM: Observable.merge(isTrackPlaying$, isTrackNotPlaying$)
      .distinctUntilChanged()
      .map((icon) => div({
      className: 'playlist-item', style: playListItemSTY
    }, [
      icon,
      div({
        style: {
          borderBottom: 'solid 1px rgba(255, 255, 255, 0.1)',
          padding: '10px 0',
          flex: '1 0 0',
          overflow: 'hidden', ...F.RowSpaceBetween,
          alignItems: 'center'
        }
      }, [
        TrackDetail({title, artist: user.username}),
        TrackDuration(duration)
      ])
    ]))
  }
}