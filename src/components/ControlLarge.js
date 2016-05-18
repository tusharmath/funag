/**
 * Created by imamudin.naseem on 16/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'
import * as A from './Artwork'
import PlaybackButtons from './PlaybackButtons'
import PlaybackInfo from './PlaybackInfo'

const DefaultArtWorkLarge = div({
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: '#ccc',
    backgroundColor: 'rgb(249, 249, 249)',
    ...F.RowMiddle
  }
}, [
  div(S.fa('music', 2))
])

const ArtWorkLarge = url => div({
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
})
const ArtWork = url => div({
  style: {
    background: `url(${url})`,
    ...S.size(100)
  }
})
export default ({audio, selectedTrack$, DOM, completion$, slide$}) => {
  const playbackBtns = PlaybackButtons({selectedTrack$, audio, DOM})
  return {
    DOM$: Observable.combineLatest(slide$, playbackBtns.DOM, Scrobber({completion$}).DOM, (slide, playbackBtns, scrobber) => ({
        slide,
        playbackBtns,
        scrobber
      }))
      .withLatestFrom(selectedTrack$, PlaybackInfo({selectedTrack$}).DOM, (control, selectedTrack, info) => ({
        ...control,
        selectedTrack,
        info
      }))
      .map(x => div({
        style: {
          position: 'fixed',
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
          bottom: `-${window.innerHeight - x.slide.bottom - 62}`,
          transition: x.slide.transition,
          ...F.FlexCol
        }
      }, [
        div({
          style: {
            position: 'absolute',
            width: '100%',
            height: '60%',
            filter: 'blur(5px)',
            '-webkitFilter': 'blur(5px)',
            overflow: 'hidden'
          }
        }, [
          x.selectedTrack.artwork_url ? ArtWorkLarge(x.selectedTrack.artwork_url) : DefaultArtWorkLarge
        ]),
        div({
          style: {height: '60%', position: 'relative', ...F.RowMiddle}
        }, [
          x.selectedTrack.artwork_url ? ArtWork(x.selectedTrack.artwork_url) : A.DefaultArtwork(100)
        ]),
        div({
          style: {
            padding: '10px 0 10 10',
            borderBottom: '1px solid #ededed',
            marginTop: '10px'
          }
        }, x.info),
        x.scrobber,
        div({style: {...F.RowMiddle}}, x.playbackBtns)
      ])).startWith(div()),
    event$: DOM.select(':root').events('click'),
    audio: playbackBtns.audio$
  }
}
