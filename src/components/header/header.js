/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

'use strict'

import css from './header.style'
import {Observable as O} from 'rx'

const view = () => O.just(
  <div className={css(css.headerContainer, 'fade-in')}>
    <div className={css('rowMiddle')}>
      <div className={css('flexSpread', css.headerText)}>
        <div>
          <strong>Funag</strong>
        </div>
        <small>Unofficial soundcloud player</small>
      </div>
    </div>
  </div>
)

export default () => {
  return {
    DOM: view()
  }
}
