/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable} from 'rx'
const noop = function () {
}

export const PLAY = {type: 'PLAY'}
export const PAUSE = {type: 'PAUSE'}
export const LOAD = src => ({type: 'PAUSE', src})

export const audioDriver = instruction$ => {
  const audio = new Audio()
  Observable.merge(
    instruction$.filter(x => x.type === 'PLAY').tap(() => audio.play()),
    instruction$.filter(x => x.type === 'PAUSE').tap(() => audio.pause()),
    instruction$.filter(x => x.type === 'LOAD').tap(x => {
      audio.src = x.src
      audio.load()
      audio.play()
    })
  ).subscribe(noop)

  return {
    events (type) {
      return Observable.fromEvent(audio, type).map(audio)
    }
  }
}
