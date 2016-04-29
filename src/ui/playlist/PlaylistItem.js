/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import FixedWidthLabel from './Label'
import TrackDetail from './TrackDetail'
import SoundVisualizerIcon from './SoundVisualizerIcon'
import isTrackPlaying from '../../Utils/isTrackPlaying'
import * as T from '../../Utils/Themes'

const playListItemSTY = {
  fontSize: '1em',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  alignItems: 'center',
  color: T.font.primary,
  borderBottom: '1px solid rgb(228, 228, 228)'
}

// TODO: Move to isTrackPlaying function
const audioEvents = audio => Observable.merge(
  audio.events('pause').map('pause'),
  audio.events('playing').map('playing'),
  audio.events('play').map('play')
)

export default ({DOM, track, audio, selectedTrack$}, index) => {
  const {title, user, duration, artwork_url, id} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const audio$ = audioEvents(audio)
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const isTrackPlaying$ = isTrackPlaying({audio$, selectedTrackId$}, id)
    .startWith(false)
    .distinctUntilChanged()

  const trackStatus$ = isTrackPlaying$.map(x => x ? SoundVisualizerIcon : FixedWidthLabel({width: 35, text: index + 1}))

  return {
    click$,
    DOM: trackStatus$.map(icon =>
      div({className: 'playlist-item', style: {...playListItemSTY}}, [
        div({style: trackInfoSTY}, [
          icon,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}
