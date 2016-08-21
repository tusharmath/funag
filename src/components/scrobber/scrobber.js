/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import './scrobber.wc'

const style = ({completion, transition}) => ({
  transform: `translateX(${100 * completion - 100}%)`,
  transition: transition ? 'transform 100ms linear' : null
})
const view = ({completion$}) => completion$
  .startWith(0)
  .map(completion =>
    <wc-scrobber key='scrobber' className='.scrobber' attrs-completion={completion}/>
  )

export default ({completion$, DOM}) => {
  const scrobberEL = DOM.select('.scrobber')

  const vTree$ = view({completion$})

  const audio$ = mux({seek: O.never()})

  return {
    DOM: vTree$, audio$
  }
}
