/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global Audio */
'use strict'

import {Observable} from 'rx'
import R from 'ramda'

export const PLAY = {type: 'PLAY'}
export const PAUSE = {type: 'PAUSE'}
export const LOAD = src => ({type: 'PAUSE', src})
const matches = value => R.where({type: R.equals(value)})

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
    }
  }
}

export const mockAudioDriver = () => {
  return {
    events () {
      return Observable.empty()
    }
  }
}
