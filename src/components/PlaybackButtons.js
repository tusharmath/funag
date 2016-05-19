/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'
import * as D from '../utils/DOMUtils'

export default ({audio, DOM}) => {
  const playPause$ = Observable.merge(
    audio.events('playing').map('pause'),
    audio.events('pause').map('play')
  ).startWith('play')
    .map(button => div({className: `ctrl-${button}`, style: S.block(T.BlockHeight)}, [S.fa(button)]))

  const loadStart$ = audio.events('loadstart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = audio.events('error').map(div({style: S.block(T.BlockHeight)}, [S.fa('exclamation-triangle')]))
  const play$ = DOM.select('.ctrl-play').events('click')
  const pause$ = DOM.select('.ctrl-pause').events('click')
  const audio$ = Observable.merge(
    play$.map({type: 'PLAY'}),
    pause$.map({type: 'PAUSE'})
  )
  return {
    audio$,
    DOM: Observable.merge(playPause$, loadStart$, loadError$).map(x => div(x)),
    event$: Observable.merge(play$, pause$).map(D.event('stopPropagation'))
  }
}
