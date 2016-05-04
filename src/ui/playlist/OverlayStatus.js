import {Observable} from 'rx'
import t from 'argtoob'

export const showSoundVisualization = event$ => event$.map(x => x.event === 'playing')
export const showPausedSoundVisualization = event$ => event$.map(x => ['pause', 'loadstart'].includes(x.event))
const audioEvents = audio => Observable.merge(
  audio.events('pause').map('pause'),
  audio.events('playing').map('playing'),
  audio.events('loadstart').map('loadstart')
)
export default ({selectedTrackId$, audio, id}) => {
  const audio$ = audioEvents(audio)
  const event$ = audio$.withLatestFrom(selectedTrackId$, t('event', 'id'))
  const isSelected$ = event$.filter(x => x.id === id)
  const animation$ = showSoundVisualization(isSelected$).filter(Boolean).map('PLAY_ANIMATION')
  const pausedAnimation$ = showPausedSoundVisualization(isSelected$).filter(Boolean).map('PAUSE_ANIMATION')
  const showNone$ = event$.filter(x => x.id !== id).map('SHOW_NONE')
  return Observable.merge(animation$, pausedAnimation$, showNone$).startWith('SHOW_NONE')
}
