/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import PlayListItem from './PlayListItem'
import Proxy from '../../Utils/Proxy'
import * as S from '../../Utils/StyleUtils'
import * as M from './Models'
import * as SC from '../../Utils/SoundCloud'
import * as T from '../../Utils/Themes'

export default ({tracks$, DOM, audio}) => {
  const proxy = Proxy()
  const playlistItem$ = tracks$.map(tracks => tracks.map((track, i) =>
    isolate(PlayListItem, track.id.toString())({track, DOM, audio, selectedTrack$: proxy.reader()}, i)
  ))
  const playlistItemVTree$ = playlistItem$.map(tracks => tracks.map(x => x.DOM))
  const playlistItemClick$ = playlistItem$.map(tracks => tracks.map(x => x.click$))
  const selectedTrack$ = proxy.writer(playlistItemClick$.flatMapLatest(clicks => Observable.merge(clicks)))
  const audio$ = M.Audio({url$: selectedTrack$.pluck('stream_url').map(url => url + SC.clientIDParams({}))})
  return {
    DOM: playlistItemVTree$
      .flatMapLatest(tracks => Observable.combineLatest(tracks))
      .map(view => div({
        className: 'tracks',
        style: {
          backgroundColor: '#fff',
          overflow: 'auto',
          ...S.absolute(0, T.BlockHeight, 0, T.BlockHeight)
        }
      }, [view])),
    selectedTrack$, audio$
  }
}
