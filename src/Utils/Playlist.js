/**
 * Created by tushar.mathur on 05/05/16.
 */

'use strict'

import {Observable, Subject} from 'rx'
import t from 'argtoob'

const AddToBottom = track => playlist => [...playlist, track]
const AddToTop = track => playlist => [track, ...playlist]
const Clear = () => []
const DeleteTrack = track => playlist => playlist.filter(x => x !== track)

export const currentTrack = ({instruction$, playlist$}) => {
  return Observable.merge(
    instruction$.filter(x => x.type === 'NEXT').map(1),
    instruction$.filter(x => x.type === 'PREVIOUS').map(-1)
    )
    .startWith(0)
    .withLatestFrom(playlist$.map(x => x.length).filter(x => x > 0), t('change', 'length'))
    .scan((prev, {change, length}) => (prev + change + length) % length, 0)
}

export const createPlaylist = ({instruction$}) => {
  const action$ = Observable.merge(
    instruction$.filter(x => x.type === 'APPEND').map(x => AddToBottom(x.track)),
    instruction$.filter(x => x.type === 'PREPEND').map(x => AddToTop(x.track)),
    instruction$.filter(x => x.type === 'CLEAR').map(() => Clear),
    instruction$.filter(x => x.type === 'DELETE').map(x => DeleteTrack(x.track))
  )
  return action$.scan((playlist, action) => action(playlist), [])
}
