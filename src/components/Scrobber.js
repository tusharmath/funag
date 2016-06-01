/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'
import {Pallete} from '../utils/Themes'

const view = ({completion$}) => {
  return completion$.map(completion =>
    div([
      div({style: {height: '4px', width: '100%'}}, [
        div({
          style: {
            ...F.RowRight,
            transition: 'transform 100ms linear',
            background: Pallete.primaryDarkColor,
            height: '100%',
            willChange: 'transform',
            transform: `translateX(${100 * completion - 100}%)`,
            transformOrigin: 'left',
            marginRight: '15px'
          }
        }, [
          div({
            style: {
              ...{...S.block(15), borderRadius: '20px'},
              backgroundColor: Pallete.accentColor,
              transform: 'translateY(-50%) translateX(100%)',
              boxShadow: Pallete.shadow
            }
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
