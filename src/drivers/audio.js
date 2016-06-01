/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global Audio */
'use strict'

import {Observable} from 'rx'
import R from 'ramda'
import {demux} from 'muxer'

export const audioDriver = instruction$ => {
  const audio = new Audio()
  const [{play, pause}] = demux(instruction$.shareReplay(1), 'play', 'pause')
  play.subscribe(({src}) => {
    if (audio.src !== src) {
      audio.src = src
      audio.load()
    }
    audio.play()
  })

  pause.subscribe(() => audio.pause())

  return {
    events (type) {
      return Observable.fromEvent(audio, type).map(audio)
    }
  }
}

export const mockAudioDriver = () => {
  const noop = R.always()
  return {
    events () {
      return Observable.empty()
    }, Play: noop, Pause: noop
  }
}
