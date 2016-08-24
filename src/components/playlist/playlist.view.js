/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import css from './playlist.style'
import {PlaylistItem} from '../placeholders/placeholders'

const PLACEHOLDER = (
  <div>
    {PlaylistItem}
    {PlaylistItem}
    {PlaylistItem}
  </div>
)

export default ({playlistDOM$, isSeeking$}) => {
  return O.combineLatest(
    playlistDOM$.startWith(PLACEHOLDER),
    isSeeking$.startWith(false)
  ).map(([view, disableScroll]) =>
    <div class={{[css.disableScroll]: disableScroll}}
         classNames={[css.playlist]}>
      {view}
    </div>
  )
}
