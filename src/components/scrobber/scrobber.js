/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import {TOUCH_START, TOUCH_END} from '../../redux-lib/actions'

const view = ({completion$, ui}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion => <x-slider attrs-completion={completion}/>)

const intent = ({DOM}) => {
  const scrobber = DOM.select('x-slider')
  const dragEnd$ = scrobber.events('changeEnd')
  const dragStart$ = scrobber.events('changeStart')
  const seek$ = dragEnd$.pluck('detail', 'completion')
  const audio$ = mux({seek: seek$})
  const store$ = O.merge(dragStart$.map(TOUCH_START), dragEnd$.map(TOUCH_END))
  return {AUDIO: audio$, STORE: store$}
}

export default ({completion$, DOM}) => {
  const vTree$ = view({completion$})
  return {
    DOM: vTree$,
    ... intent({DOM})
  }
}
