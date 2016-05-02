/**
 * Created by imamudin.naseem on 02/05/16.
 */

'use strict'
import t from 'argtoob'
import {Observable} from 'rx'

export default ({audio$, selectedTrackId$}, id) => {
  const events$ = audio$.withLatestFrom(selectedTrackId$, t('event', 'id'))
  const state$ = Observable.merge(
    events$.filter(x => x.event === 'playing' && x.id === id).map('PLAYING'),
    events$.filter(x => x.event === 'pause' && x.id === id).map('PAUSED'),
    events$.filter(x => x.event === 'play' && x.id === id).map('LOADING'),
    events$.filter(x => x.event === 'play' && x.id !== id).map('STOPPED')
  )
  return state$
}
