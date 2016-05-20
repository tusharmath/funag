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

export default ({audio, DOM}) => {
  const playPause$ = Observable.merge(
    audio.events('playing').map('pause'),
    audio.events('pause').map('play')
  ).startWith('play')
    .map(button => div({className: `ctrl-${button}-large`, style: S.block(T.BlockHeight)}, [S.fa(button, 1.5)]))

  const loadStart$ = audio.events('loadstart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = audio.events('error').map(div({style: S.block(T.BlockHeight)}, [S.fa('exclamation-triangle')]))
  const play$ = DOM.select('.ctrl-play-large').events('click')
  const pause$ = DOM.select('.ctrl-pause-large').events('click')
  const audio$ = Observable.merge(
    play$.map({type: 'PLAY'}),
    pause$.map({type: 'PAUSE'})
  )
  return {
    audio$,
    DOM: Observable.merge(playPause$, loadStart$, loadError$).map(x => div({
      style: {
        ...F.RowSpaceAround,
        flex: '1 0 0',
        alignItems: 'Center'
      }
    }, [S.fa('random'), S.fa('backward'), x, S.fa('forward'), S.fa('repeat')])),
    event$: Observable.merge(play$, pause$).map(D.event('stopPropagation'))
  }
}
