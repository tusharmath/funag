/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div, span} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import * as SC from '../../Utils/SoundCloud'
import {overflowEllipsisSTY, subtitleSTY} from '../../Utils/StyleUtils'

const Artwork = artwork_url => artwork_url ? div({
  style: {
    WebkitFilter: 'blur(2px)',
    backgroundImage: `url(${artwork_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundSize: '100%',
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }
}) : null
const Index = index => div({style: {...subtitleSTY, width: '35px', textAlign: 'center'}}, [index + 1])

const TrackDuration = duration =>
  div({style: {color: '#555', fontSize: '0.8em', padding: '0 10px'}}, SC.durationFormat(duration))

const TrackDetail = ({artist, title}) =>
  div({style: {overflow: 'hidden'}}, [
    div({style: overflowEllipsisSTY}, title),
    div({style: {...subtitleSTY, ...overflowEllipsisSTY}}, artist)
  ])

const TrackDetailContainer = ({title, user, duration}) =>
  div({
    style: {
      padding: '10px 0',
      flex: '1 0 0',
      overflow: 'hidden', ...F.RowSpaceBetween,
      alignItems: 'center'
    }
  }, [
    TrackDetail({title, artist: user.username}),
    TrackDuration(duration)
  ])

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
        Index(index),
        TrackDetailContainer({title, user, duration})
      ])
    ]))
  }
}
