/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import t from 'argtoob'
import {Observable} from 'rx'

export const isTrackPlaying = ({audio$, selectedTrackId$}, id) => {
  const events$ = audio$.withLatestFrom(selectedTrackId$, t('event', 'id'))
  const true$ = Observable.merge(
    events$.filter(x => x.event === 'playing' && x.id === id)
  ).map(true)

  const false$ = Observable.merge(
    events$.filter(x => x.event === 'play' && x.id !== id),
    events$.filter(x => x.event === 'pause' && x.id === id)
  ).map(false)

  return Observable.merge(true$, false$)
}
