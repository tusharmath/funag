/**
 * Created by tushar.mathur on 10/05/16.
 */

'use strict'
import {div} from 'cycle-maquette'
import * as F from '../utils/Flexbox'
import * as S from '../utils/StyleUtils'

const PlayListItemSTY = {
  ...F.RowLeft,
  'padding': '10px',
  'align-items': 'center',
  'border-bottom': '1px solid rgb(249, 246, 246)',
  'border-radius': '2px'
}

const animatedBG = {
  'background': 'linear-gradient(to right , rgb(245, 245, 245), #fff)',
  'animation': 'horizontal-motion 1000ms linear infinite',
  'background-size': '400%'
}

export const PlaylistItem =
  div('.playlist-item-placeholder', {style: S.stringifyStyle(PlayListItemSTY)}, [
    div({style: S.stringifyStyle({height: '50px', width: '50px', ...animatedBG})}),
    div({style: S.stringifyStyle({flex: '1 0 0', margin: '0 10px'})}, [
      div({style: S.stringifyStyle({height: '1em', width: '100%', ...animatedBG})}),
      div({style: S.stringifyStyle({height: '1em', width: '75%', ...animatedBG, marginTop: '10px'})})
    ])
  ])
