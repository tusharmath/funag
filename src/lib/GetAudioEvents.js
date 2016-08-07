/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'
import {Observable as O} from 'rx'

export default audio => {
  const t = event => audio => ({event, audio})
  return O.merge(
    audio.events('loadeddata').map(t('loadedData')),
    audio.events('seeked').map(t('seeked')),
    audio.events('pause').map(t('pause')),
    audio.events('ended').map(t('ended')),
    audio.events('playing').map(t('playing')),
    audio.events('playing')
      .flatMapLatest(() => audio.events('timeupdate').first())
      .map(t('reallyPlaying')),
    O.merge(audio.events('loadstart'), audio.events('seeking'))
      .map(t('loadStart')),
    audio.events('error').map(t('error')),
    audio.events('timeupdate').map(t('timeUpdate'))
  )
}
