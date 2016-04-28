/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import * as S from '../../Utils/StyleUtils'
import BallScaleRipple from './BallScaleRipple'

const controlsSTY = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  width: '100%'
}

export default ({audio, DOM}) => {
  const playPause$ = Observable.merge(
    audio.events('playing').map('pause'),
    audio.events('pause').map('play')
  ).startWith('play')
    .map(button => div({className: `ctrl-${button}`, style: S.block(50)}, [S.fa(button)]))

  const loadStart$ = audio.events('loadstart').map(div({style: S.block(50)}, [BallScaleRipple(2)]))

  const audio$ = Observable.merge(
    DOM.select('.fa.fa-pause').events('click').map({type: 'PAUSE'}),
    DOM.select('.fa.fa-play').events('click').map({type: 'PLAY'})
  ).distinctUntilChanged()
  return {
    audio$, DOM: Observable.merge(playPause$, loadStart$)
  }
}
