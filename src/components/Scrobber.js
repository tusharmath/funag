/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from '@cycle/dom'

export default ({completion$}) => {
  return {
    DOM: completion$.throttle(500).map(completion =>
      div([
        div({style: {height: '2px', width: '100%'}}, [
          div({
            style: {
              transition: 'transform 100ms linear',
              background: '#f00',
              height: '100%',
              width: '100%',
              transform: `translateX(${100 * completion - 100}%)`,
              transformOrigin: 'left'
            }
          })
        ])
      ])
    )
  }
}
