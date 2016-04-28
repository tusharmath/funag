/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import * as S from '../../Utils/StyleUtils'
import {BufferingLoader} from './ballScaleRipple'

const controlsSTY = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  width: '100%'
}

export default ({audio, DOM}) => {
  const ev = Observable.merge(
    audio.events('playing').map('pause'),
    audio.events('pause').map('play'),
    audio.events('loadstart').map('loadstart')
  ).distinctUntilChanged().startWith('play')

  const audio$ = Observable.merge(
    DOM.select('.fa.fa-pause').events('click').map({type: 'PAUSE'}),
    DOM.select('.fa.fa-play').events('click').map({type: 'PLAY'})
  ).distinctUntilChanged()

  return {
    audio$,
    DOM: ev.map(event =>
      div({style: F.RowSpaceAround}, [
        div({style: controlsSTY}, [
          event === 'loadstart' ? BufferingLoader : S.fa(event)
        ])
      ])
    )
  }
}
