/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import TrackDetail from './TrackDetail'
import SoundVisualizerIcon from './SoundVisualizerIcon'
import TrackState from '../../Utils/TrackState'
import * as T from '../../Utils/Themes'

const playListItemSTY = {
  fontSize: '1em',
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
  const isTrackPlaying$ = TrackState({audio$, selectedTrackId$}, id)
    .startWith('STOPPED')
    .distinctUntilChanged()
    .map(state => ['PLAYING', 'PAUSED', 'LOADING'].includes(state) ? SoundVisualizerIcon(state) : null)

  const trackStatus$ = isTrackPlaying$
    .map(icon => div({style: {position: 'relative'}}, [Artwork(artwork_url), icon]))

  return {
    click$,
    DOM: trackStatus$.map(status =>
      div({className: 'playlist-item', style: {...playListItemSTY}}, [
        div({style: trackInfoSTY}, [
          status,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}
