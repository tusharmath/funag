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
  const seekTo$ = dragEnd$
    .pluck('detail', 'completion')
  const seeking$ = O.merge(dragStart$.map(true), dragEnd$.map(false))
  return {seekTo$, seeking$}
}

export default ({completion$, DOM}) => {
  const ui = new ScrobberUIModel('x-scrobber')
  const {seekTo$, seeking$} = model({DOM})
  const vTree$ = view({completion$, ui})
  const audio$ = mux({seek: seekTo$})
  return {
    DOM: vTree$, audio$, seeking$
  }
}
