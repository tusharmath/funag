/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

'use strict'

import css from './header.style'
import {Observable as O} from 'rx'

const view = () => O.just(
  <div className={css(css.headerContainer)}>

    <div className={css('flb col jc_c spread', css.headerText)}>
      <div>
        <strong>Funag</strong>
      </div>
      <small>Unofficial soundcloud player</small>
    </div>
  </div>
)

export default () => {
  return {
    DOM: view()
  }
}
