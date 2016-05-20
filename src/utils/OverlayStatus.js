import {Observable} from 'rx'

export const isSelected = (event$, id) => event$
  .filter(([event, _id]) => _id === id)

export const playing = (event$, id) => isSelected(event$, id)
  .filter(([{event}]) => event === 'reallyPlaying')
  .map('PLAY_ANIMATION')

export const paused = (event$, id) => isSelected(event$, id)
  .filter(([{event}]) => ['pause', 'loadStart'].includes(event))
  .map('PAUSE_ANIMATION')

export const noAnime = (event$, id) => event$
  .filter(([{event}, _id]) => [_id !== id, event === 'ended'].some(Boolean))
  .map('SHOW_NONE')

export default ({selectedTrackId$, audio$, id}) => {
  const event$ = audio$.withLatestFrom(selectedTrackId$)
  const animation$ = playing(event$, id)
  const pauseAnime$ = paused(event$, id)
  const noAnime$ = noAnime(event$, id)
  return Observable.merge(animation$, pauseAnime$, noAnime$).startWith('SHOW_NONE')
    .distinctUntilChanged()
}
