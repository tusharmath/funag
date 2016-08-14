/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import * as SC from '../../lib/SoundCloud'
import css from './home.style'
import Header from '../header/header'
import Playlist from '../playlist/playlist'
import HttpSelectBody from '../../lib/HttpSelectBody'
import MovableSection from '../movable-section/movable-section'
import addPX from '../../lib/AddPX'

const view = ({sections, header}) => O
  .combineLatest(header.DOM, sections.DOM)
  .map(views => <div className={css(css.home, 'flexCol')}>{views}</div>)

const createTrendingTracksRequest = () => O.just({
  url: SC.toURI('/tracks', {}),
  category: 'trending-tracks'
})
const sectionContent = (
  <content>
    <section style={{padding: addPX(50)}}>A</section>
    <section style={{padding: addPX(50)}}>B</section>
    <section style={{padding: addPX(50)}}>C</section>
  </content>
)

export default ({HTTP, AUDIO, DOM, ROUTER}) => {
  const sections = MovableSection({DOM, content: sectionContent, count: 3})
  const tracks$ = HttpSelectBody(HTTP, 'trending-tracks')
  const header = Header({DOM, ROUTER})
  const defaultTrack$ = tracks$.map(R.head)
  const playlist = Playlist({tracks$, defaultTrack$, AUDIO, DOM})
  // playlist.selectedTrack$.subscribe(x => console.log('TODO: remove subscription', x))
  return {
    DOM: view({header, sections}),
    HTTP: createTrendingTracksRequest(),
    AUDIO: O.merge(playlist.audio$),
    ROUTER: O.merge(header.ROUTER),
    EVENTS: sections.EVENTS
  }
}
