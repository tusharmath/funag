/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import R from 'ramda'
import css from './movable-section.style'
import {createMovableSection} from '../../lib/MovableSection'
import RAFThrottle from '../../lib/RAFThrottle'

const wrapLI = content => <li>{content}</li>
const view = ({sections, style$}) => style$
  .startWith({width: `${100 * sections.length}%`})
  .map(style =>
    <div className={css(css.movableSection, 'movable-section', 'fade-in')}>
      <ul style={style}>
        {R.map(wrapLI, sections)}
      </ul>
    </div>
  )
export default ({DOM, sections}) => {
  const element = DOM.select('.movable-section')
  const style$ = RAFThrottle(createMovableSection(DOM, element, sections.length))
  const vTree$ = view({sections, style$})
  return {DOM: vTree$}
}
