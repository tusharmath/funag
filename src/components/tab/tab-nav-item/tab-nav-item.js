/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import isolate from '@cycle/isolate'
import {getElementBCR} from '../../../lib/BoundingClientRect'

const activeCSS = (INDEX, selected) => INDEX === selected ? 'active' : ''
const view = ({title, selected$, INDEX}) => selected$
  .map(selected =>
    <li className={activeCSS(selected, INDEX)}>{title}</li>
  )
const TabNavItem = ({DOM, selected$, ROW, INDEX}) => {
  const title = ROW
  const li = DOM.select('li')
  const click$ = li.events('click').map(INDEX)
  const bcr$ = getElementBCR(li.elements())
    .filter(dim => dim.height > 0 && dim.width > 0)
    .take(1)
    .shareReplay(1)
  return {DOM: view({title, selected$, INDEX}), click$, bcr$}
}
export default sources => isolate(TabNavItem)(sources)
