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
  const [{play, pause, seek, load}] = demux(
    instruction$, 'play', 'pause', 'seek', 'load'
  )

  load.subscribe(({src}) => {
    audio.src = src
  })

  play.subscribe(({src}) => {
    if (audio.src !== src) {
      audio.pause()
      audio.src = src
      audio.load()
    }
    audio.play()
  })

  pause.subscribe(() => audio.pause())

  seek.subscribe(x => {
    audio.currentTime = audio.duration * x
  })

  return {
    events (type) {
      return Observable.fromEvent(audio, type.toLowerCase())
        .map(audio)
    }
  }
}

export const mockAudioDriver = () => {
  const noop = R.always()
  return {
    events () {
      return Observable.empty()
    },
    Play: noop,
    Pause: noop
  }
}
