/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import FixedWidthLabel from './Label'
import TrackDetail from './TrackDetail'

const playListItemSTY = {
  fontSize: '1em',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden'
}

export default ({DOM, track: {title, user, duration, artwork_url, id}, trackListClick$}, index) => {
  const click$ = DOM.select('.playlist-item').events('click').map(id)
  return {
    click$,
    DOM: Observable.just(div({
      className: 'playlist-item', style: {...playListItemSTY}
    }, [
      Artwork(artwork_url),
      div({
        style: {
          alignItems: 'center', ...F.RowSpaceBetween,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          position: 'relative'
        }
      }, [
        FixedWidthLabel({width: 35, text: index + 1}),
        TrackDetail({title, user, duration})
      ])
    ]))
  }
}
