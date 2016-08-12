/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import color from 'randomcolor'
import * as SC from '../../lib/SoundCloud'
import css from './home.style'
import Header from '../header/header'
import Playlist from '../playlist/playlist'
import HttpSelectBody from '../../lib/HttpSelectBody'
import MovableSection from '../movable-section/movable-section'

const view = ({sections, header}) => O
  .combineLatest(header.DOM, sections.DOM)
  .map(views => <div className={css(css.home, 'flexCol')}>{views}</div>)

const createTrendingTracksRequest = () => O.just({
  url: SC.toURI('/tracks', {}),
  category: 'trending-tracks'
})
const sectionContent = [

  <div style={{backgroundColor: color(), padding: 50}}>A</div>,
  <div style={{backgroundColor: color(), padding: 50}}>B</div>,
  <div style={{backgroundColor: color(), padding: 50}}>C</div>,
  <div style={{backgroundColor: color(), padding: 50}}>D</div>,
  <div style={{backgroundColor: color(), padding: 50}}>E</div>,
  <div style={{backgroundColor: color(), padding: 50}}>F</div>,
  <div style={{backgroundColor: color(), padding: 50}}>G</div>
]
export default ({HTTP, AUDIO, DOM, ROUTER}) => {
  const sections = MovableSection({DOM, sections: sectionContent})
  const tracks$ = HttpSelectBody(HTTP, 'trending-tracks')
  const header = Header({DOM, ROUTER})
  const defaultTrack$ = tracks$.map(R.head)
  const playlist = Playlist({tracks$, defaultTrack$, AUDIO, DOM})
  playlist.selectedTrack$.subscribe(x => console.log('TODO: remove subscription', x))
  return {
    DOM: view({header, sections}),
    HTTP: createTrendingTracksRequest(),
    AUDIO: O.merge(playlist.audio$),
    ROUTER: O.merge(header.ROUTER)
  }
}
