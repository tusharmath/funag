/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import * as S from '../../Utils/StyleUtils'

const controlsSTY = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  width: '100%'
}

export default ({audio, DOM}) => {
  const ev = Observable.merge(
    audio.events('play').map('pause'),
    audio.events('pause').map('play')
  ).distinctUntilChanged().startWith('play')

  const audio$ = Observable.merge(
    DOM.select('.fa.fa-pause').events('click').map({type: 'PAUSE'}),
    DOM.select('.fa.fa-play').events('click').map({type: 'PLAY'})
  ).distinctUntilChanged()

  return {
    audio$,
    DOM: ev.map(icon =>
      div({style: F.RowSpaceAround}, [
        div({style: controlsSTY}, [
          S.fa('backward'),
          S.fa(icon, 2),
          S.fa('forward')
        ])
      ])
    )
  }
}
