/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {mux} from 'muxer'
import {h} from '@cycle/dom'
import R from 'ramda'

const view = ({completion$, ui}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion => h('x-slider', {attrs: {completion}}))

const intent = ({DOM}) => {
  const scrobber = DOM.select('x-slider')
  const change$ = scrobber.events('change')
  const seek$ = change$.pluck('detail', 'completion')
  const audio$ = mux({seek: seek$})
  return {AUDIO: audio$}
}

export default ({completion$, DOM}) => {
  const vTree$ = view({completion$})
  return R.merge(intent({DOM}), {DOM: vTree$})
}
