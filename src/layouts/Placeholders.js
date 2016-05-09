/**
 * Created by tushar.mathur on 10/05/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as F from '../utils/Flexbox'

const PlayListItemSTY = {
  ...F.RowLeft,
  padding: '10px',
  alignItems: 'center',
  borderBottom: '1px solid rgb(249, 246, 246)',
  borderRadius: '2px'
}

const animatedBG = {
  background: 'linear-gradient(to right , rgb(245, 245, 245), #fff)',
  animation: 'horizontal-motion 1000ms linear infinite',
  backgroundSize: '400%'
}

export const PlaylistItem =
  div('.playlist-item-placeholder', {style: PlayListItemSTY}, [
    div({style: {height: '50px', width: '50px', ...animatedBG}}),
    div({style: {flex: '1 0 0', margin: '0 10px'}}, [
      div({style: {height: '1em', width: '100%', ...animatedBG}}),
      div({style: {height: '1em', width: '75%', ...animatedBG, marginTop: '10px'}})
    ])
  ])
