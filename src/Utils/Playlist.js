/**
 * Created by tushar.mathur on 05/05/16.
 */

'use strict'

import {Observable} from 'rx'
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
    .tap(x => console.log('A', x))
    .withLatestFrom(playlist$.tap(x => console.log('B', x)).map(x => x.length).filter(x => x > 0), t('change', 'length'))
    .tap(x => console.log('C', x))
    .scan((prev, x) => {
      const next = prev + x.change
      if (next > x.length - 1) return 0
      if (next < 0) return x.length - 1
      return next
    }, 0)
}

export const createPlaylist = ({instruction$, ended$}) => {
  const currentTrack$ = Observable.merge(
    instruction$.filter(x => x.type === 'NEXT').map(1),
    instruction$.filter(x => x.type === 'PREVIOUS').map(-1)
    )
    .startWith(0)
    .scan((prev, change) => prev + change)
  const action$ = Observable.merge(
    instruction$.filter(x => x.type === 'APPEND').map(x => AddToBottom(x.track)),
    instruction$.filter(x => x.type === 'PREPEND').map(x => AddToTop(x.track)),
    instruction$.filter(x => x.type === 'CLEAR').map(() => Clear),
    instruction$.filter(x => x.type === 'DELETE').map(x => DeleteTrack(x.track))
  )

  const playlist$ = action$.scan((playlist, action) => action(playlist), [])
  return playlist$.filter(x => x.length > 0).map(x => x[0])
}
