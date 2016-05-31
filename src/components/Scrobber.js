/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from 'cycle-snabbdom'
import * as S from '../utils/StyleUtils'
import {Pallete} from '../utils/Themes'

export default ({completion$}) => {
  return {
    DOM: completion$.map(completion =>
      div([
        div({style: {height: '2px', width: '100%'}}, [
          div({
            style: {
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
                ... {top: '0', right: '0', position: 'absolute'},
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
}
