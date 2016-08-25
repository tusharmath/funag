/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import css from './playlist.style'
import {PlaylistItem} from '../placeholders/placeholders'

const PLACEHOLDER = (<div>{R.repeat(PlaylistItem, 3)}</div>)

export default ({playlistDOM$}) => {
  return playlistDOM$.startWith(PLACEHOLDER)
    .map(view => <div classNames={[css.playlist]}>{view}</div>)
}
