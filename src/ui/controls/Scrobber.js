/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from '@cycle/dom'

export default ({completion$}) => {
  return {
    DOM: completion$.map(completion =>
      div([
        div({style: {height: '2px', width: '100%'}}, [
          div({
            style: {
              transition: 'transform 100ms linear',
              background: '#fff',
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
