/**
 * Created by tushar.mathur on 23/04/16.
 */
'use strict'
import {div} from '@cycle/dom'
import t from 'argtoob'
import {Observable} from 'rx'

const intent = ({DOM, audio}) => ({
  scrobberClick$: DOM.select('.scrobber').events('mouseup'),
  audioTimeUpdate$: audio.events('timeupdate'),
  scrobberTouchMove$: DOM.select('.scrobber').events('touchmove'),
  rect$: DOM.select(':root').observable.first().map(x => x.getBoundingClientRect())
})

const model = (i) => {
  const position$ = Observable.merge(i.scrobberClick$, i.scrobberTouchMove$.map(x => x.changedTouches[0]))
    .distinctUntilChanged()
    .withLatestFrom(i.rect$, t('scrobber', 'rect'))
    .map(getScrobberPosition)
    .map(time => ({time, type: 'SEEK'}))
  return Observable.merge(position$, i.audioTimeUpdate$.map(x => ({time: x.currentTime / x.duration})))
    .distinctUntilChanged()
    .startWith({time: 0})
}

const getScrobberPosition = ({scrobber, rect : {width: screenWidth}}) => scrobber.pageX / screenWidth
const getPlayTime = ({audio, seekTo}) => audio.duration * seekTo


export default ({DOM, audio}) => {
  const audio$ = model(intent({DOM, audio}))
  return {
    DOM: audio$.map(audio => div([
      div({className: 'scrobber', style: {height: '10px', width: '100%', background: '#DADADA'}}, [
        div({
          style: {
            background: '#f00',
            height: '100%',
            width: `${100 * audio.time}%`
          }
        })
      ])
    ])),
    audio$
  }
}
