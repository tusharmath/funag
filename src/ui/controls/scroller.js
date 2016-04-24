/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from '@cycle/dom'

export default ({completion$}) => {
  return {
    DOM: completion$.map(completion =>
      div([
        div({style: {background: 'radial-gradient(#000000, #1E1F23)', height: '1px', width: '100%'}}, [
          div({
            style: {
              transition: 'transform 500ms linear',
              backgroundColor: 'rgb(148, 143, 63)',
              height: '100%',
              width: '100%',
              transform: `scaleX(${completion})`,
              transformOrigin: 'left'
            }
          })
        ])
      ])
    )
  }
}
