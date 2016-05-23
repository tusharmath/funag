/**
 * Created by imamudin.naseem on 19/05/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'
import * as D from '../utils/DOMUtils'
import * as F from '../utils/Flexbox'

const disabled = element => div({style: {color: 'rgb(195, 194, 194)'}}, element)

const intent = ({DOM}) => ({
  play$: DOM.select('.ctrl-play-large').events('click'),
  pause$: DOM.select('.ctrl-pause-large').events('click')
})

const model = ({play$, pause$, audio$}) => {
  const event$ = audio$.pluck('event')
  const playPause$ = Observable.merge(
    event$.filter(x => x === 'playing').map('pause'),
    event$.filter(x => x === 'pause').map('play')
    )
    .startWith('play')
    .map(button => div({className: `ctrl-${button}-large`, style: S.block(T.BlockHeight)}, [S.fa(button, 1.5)]))

  const loadStart$ = event$.filter(x => x === 'loadStart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = event$
    .filter(x => x === 'error').map(div({style: S.block(T.BlockHeight)}, [S.fa('exclamation-triangle')]))
  return {
    playPause$, loadStart$, loadError$,
    audio_$: Observable.merge(
      play$.map({type: 'PLAY'}),
      pause$.map({type: 'PAUSE'})
    )
  }
}

const view = ({playPause$, loadStart$, loadError$}) =>
  Observable.merge(playPause$, loadStart$, loadError$).map(x =>
    div({style: {flex: '1 0 0', ...F.ColSpaceAround, color: '#fff'}}, [
      div({
        style: {
          ...F.RowSpaceAround,
          alignItems: 'Center',
          padding: '0 40px'
        }
      }, [disabled(S.fa('backward')), x, disabled(S.fa('forward'))]),
      div({
        style: {
          ...F.RowSpaceBetween,
          padding: '10px 20px'
        }
      }, [disabled(S.fa('random')), S.fa('repeat'), disabled(S.fa('list'))])
    ]))

export default ({audio$, DOM}) => {
  const {play$, pause$} = intent({DOM})
  const {playPause$, loadStart$, loadError$, audio_$} = model({play$, pause$, audio$})
  return {
    audio$: audio_$,
    DOM: view({playPause$, loadStart$, loadError$}),
    event$: Observable.merge(play$, pause$).map(D.event('stopPropagation'))
  }
}
