/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {mux} from 'muxer'
import {ScrobberUIModel} from './scrobber.native'

const view = ({completion$, ui}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion => ui.update(completion))

export default ({completion$, DOM}) => {
  const ui = new ScrobberUIModel('x-scrobber')
  const seek$ = DOM
    .select(ScrobberUIModel.tagName)
    .events('changeEnd')
    .pluck('detail', 'completion')
  const vTree$ = view({completion$, ui})
  const audio$ = mux({seek: seek$})
  return {
    DOM: vTree$, audio$
  }
}
