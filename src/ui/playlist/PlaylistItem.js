/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import FixedWidthLabel from './Label'
import TrackDetail from './TrackDetail'
import {Visualizer} from './SoundVisualizerIcon'

const playListItemSTY = {
  fontSize: '1em',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden'
}

export default ({DOM, track, trackListClick$, isPlaying$}, index) => {
  const {title, user, duration, artwork_url} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const isSelected$ = Observable.merge(trackListClick$.map(false), click$.map(true)).startWith(false)
  const track$ = Observable.combineLatest(isPlaying$, isSelected$, (isPlaying$, isSelected$) => [isPlaying$, isSelected$].every(Boolean)).distinctUntilChanged()
  const isTrackPlaying$ = track$.filter(x => x).map(() => div({
    style: {
      height: '35px',
      width: '35px', ...F.RowMiddle
    }
  }, [Visualizer]))
  const isTrackNotPlaying$ = track$.filter(x => !x).map(() => FixedWidthLabel({width: 35, text: index + 1}))
  return {
    click$,
    DOM: Observable.merge(isTrackPlaying$, isTrackNotPlaying$)
      .distinctUntilChanged()
      .map(icon => div({className: 'playlist-item', style: {...playListItemSTY}}, [
        Artwork(artwork_url),
        div({
          style: {
            alignItems: 'center', ...F.RowSpaceBetween,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }
        }, [
          icon,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}
