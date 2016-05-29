/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global Audio */
'use strict'

import {Observable} from 'rx'
import R from 'ramda'

const params = R.zipObj(['type', 'src'])
const tuple = R.curry((a, b) => [a, b])
export const Play = R.compose(params, tuple('PLAY'))
export const Pause = R.compose(params, tuple('PAUSE'))
export const matches = R.compose(
  R.whereEq,
  R.objOf('type')
)

export const audioDriver = instruction$ => {
  const audio = new Audio()

  instruction$.filter(matches('PLAY')).subscribe(({src}) => {
    if (audio.src !== src) {
      audio.src = src
      audio.load()
    }
    audio.play()
  })

  instruction$.filter(matches('PAUSE')).subscribe(() => audio.pause())

  return {
    events (type) {
      return Observable.fromEvent(audio, type).map(audio)
    }, Play, Pause
  }
}

export const mockAudioDriver = () => {
  return {
    events () {
      return Observable.empty()
    }
  }
}
