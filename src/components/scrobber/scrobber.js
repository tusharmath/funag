/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {mux} from 'muxer'
import './scrobber.wc'

const view = ({completion$}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion =>
    <wc-scrobber key='scrobber'
                 className='scrobber'
                 attrs-completion={completion}/>
  )

export default ({completion$, DOM}) => {
  const seek$ = DOM
    .select('.scrobber')
    .events('changeEnd')
    .pluck('detail', 'completion')
  const vTree$ = view({completion$})
  const audio$ = mux({seek: seek$})
  return {
    DOM: vTree$, audio$
  }
}
