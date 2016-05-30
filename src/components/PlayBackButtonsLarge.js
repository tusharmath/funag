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
  pause$: DOM.select('.ctrl-pause-large').events('click'),
  repeat$: DOM.select('.repeat').events('click'),
  reload$: DOM.select('.reload').events('click')
})

const model = ({play$, pause$, audio$, repeat$, reload$}) => {
  const event$ = audio$.pluck('event')
  const playPause$ = Observable.merge(
    event$.filter(x => x === 'playing').map('pause'),
    event$.filter(x => x === 'pause').map('play')
    )
    .startWith('play')
    .map(button => div({className: `ctrl-${button}-large`, style: S.block(T.BlockHeight)}, [S.fa(button, 1.5)]))

  const loadStart$ = event$.filter(x => x === 'loadStart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = event$
    .filter(x => x === 'error').map(div({style: S.block(T.BlockHeight)}, [div('.reload', {style: {...S.size(60), ...F.RowMiddle}}, S.fa('exclamation-triangle'))]))
  const repeat$_ = repeat$.scan(x => !x)
  const isRepeat$ = event$
    .filter(x => x === 'ended')
    .withLatestFrom(repeat$_)
    .filter(([, repeat]) => Boolean(repeat))
  return {
    repeat$_, playPause$, loadStart$, loadError$,
    audio$_: Observable.merge(
      play$.map({type: 'PLAY'}),
      pause$.map({type: 'PAUSE'}),
      isRepeat$.map({type: 'REPLAY'}),
      reload$.map({type: 'RELOAD'})
    )
  }
}

const view = ({playPause$, loadStart$, loadError$, repeat$}) =>
  Observable.merge(playPause$, loadStart$, loadError$)
    .combineLatest(repeat$)
    .map(([playBtn, repeat]) =>
      div({style: {flex: '1 0 0', ...F.ColSpaceAround, color: '#fff'}}, [
        div({
          style: {
            ...F.RowSpaceAround,
            alignItems: 'Center',
            padding: '0 40px'
          }
        }, [disabled(S.fa('backward')), playBtn, disabled(S.fa('forward'))]),
        div({
          style: {
            ...F.RowSpaceBetween,
            padding: '10px 20px',
            alignItems: 'Center'
          }
        }, [
          disabled(S.fa('random')),
          div('.repeat', {style: {color: repeat ? T.Pallete.primaryDarkColor : 'white', ...S.size(40), ...F.RowMiddle}},
            S.fa('retweet')),
          disabled(S.fa('list'))
        ])
      ]))

export default ({audio$, DOM}) => {
  const {play$, pause$, repeat$, reload$} = intent({DOM})
  const {playPause$, loadStart$, loadError$, audio$_, repeat$_} = model({
    play$,
    pause$,
    audio$,
    reload$,
    repeat$: repeat$.startWith(false)
  })
  return {
    audio$: audio$_,
    DOM: view({playPause$, loadStart$, loadError$, repeat$: repeat$_}),
    event$: Observable.merge(play$, pause$, repeat$, reload$).map(D.event('stopPropagation'))
  }
}
