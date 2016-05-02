/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import {Observable} from 'rx'
import * as S from '../../Utils/StyleUtils'

export default ({audio, DOM}) => {
  const playPause$ = Observable.merge(
    audio.events('playing').map('pause'),
    audio.events('pause').map('play')
  ).startWith('play')
    .map(button => div({className: `ctrl-${button}`, style: S.block(50)}, [S.fa(button)]))

  const loadStart$ = audio.events('loadstart').map(div({style: S.block(50)}, [div('.loader')]))

  const audio$ = Observable.merge(
    DOM.select('.ctrl-play').events('click').map({type: 'PLAY'}),
    DOM.select('.ctrl-pause').events('click').map({type: 'PAUSE'})
  )
  return {
    audio$, DOM: Observable.merge(playPause$, loadStart$).map(x => div(x))
  }
}
