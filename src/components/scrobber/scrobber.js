/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import {ScrobberUIModel} from './scrobber.native'

const view = ({completion$, ui}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion => ui.update(completion))

const model = ({DOM}) => {
  const scrobber = DOM
    .select(ScrobberUIModel.tagName)
  const dragEnd$ = scrobber
    .events('changeEnd')
  const dragStart$ = scrobber
    .events('changeStart')
  const seek$ = dragEnd$
    .pluck('detail', 'completion')
  const isSeeking$ = O.merge(dragStart$.map(true), dragEnd$.map(false))
  return {seek$, isSeeking$}
}

export default ({completion$, DOM}) => {
  const ui = new ScrobberUIModel('x-scrobber')
  const {seek$, isSeeking$} = model({DOM})
  const vTree$ = view({completion$, ui})
  const audio$ = mux({seek: seek$})
  return {
    DOM: vTree$, audio$, isSeeking$
  }
}
