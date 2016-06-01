/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from 'cycle-maquette'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'
import {Pallete} from '../utils/Themes'

const view = ({completion$}) => {
  return completion$.map(completion =>
    div([
      div({style: S.stringifyStyle({height: '4px', width: '100%'})}, [
        div({
          style: S.stringifyStyle({
            ...F.RowRight,
            'transition': 'transform 100ms linear',
            'background': Pallete.primaryDarkColor,
            'height': '100%',
            'will-change': 'transform',
            'transform': `translateX(${100 * completion - 100}%)`,
            'transform-origin': 'left',
            'margin-right': '15px'
          })
        }, [
          div({
            style: S.stringifyStyle({
              ...{...S.block(15), 'border-radius': '20px'},
              'background-color': Pallete.accentColor,
              'transform': 'translateY(-50%) translateX(100%)',
              'boxShadow': Pallete.shadow
            })
          })
        ])
      ])
    ])
  )
}

export default ({completion$}) => {
  const vTree$ = view({completion$})
  return {
    DOM: vTree$
  }
}
