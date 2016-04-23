/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {div} from '@cycle/dom'

export default ({completion$}) => {
  return {
    DOM: completion$.map(completion =>
      div({style: {padding: '0 10px'}}, [
        div({style: {backgroundColor: '#000', height: '4px', width: '100%'}}, [
          div({
            style: {
              transition: 'transform 300ms ease-in',
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
