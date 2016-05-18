import {Observable} from 'rx'

export const isSelected = (event$, id) => event$
  .filter(([event, _id]) => _id === id)

export const playing = (event$, id) => isSelected(event$, id)
  .filter(([event]) => event === 'playing')
  .map('PLAY_ANIMATION')

export const paused = (event$, id) => isSelected(event$, id)
  .filter(([event]) => ['pause', 'loadstart'].includes(event))
  .map('PAUSE_ANIMATION')

export const noAnime = (event$, id) => event$
  .filter(([event, _id]) => [_id !== id, event === 'ended'].some(Boolean))
  .map('SHOW_NONE')

const audioEvents = audio => Observable.merge(
  audio.events('pause').map('pause'),
  audio.events('ended').map('ended'),
  audio.events('playing').flatMapLatest(() => audio.events('timeupdate').first())
    .map('playing'),
  audio.events('loadstart').map('loadstart')
)
export default ({selectedTrackId$, audio, id}) => {
  const audio$ = audioEvents(audio)
  const event$ = audio$.withLatestFrom(selectedTrackId$)
  const animation$ = playing(event$, id)
  const pauseAnime$ = paused(event$, id)
  const noAnime$ = noAnime(event$, id)
  return Observable.merge(animation$, pauseAnime$, noAnime$).startWith('SHOW_NONE')
    .distinctUntilChanged()
}
