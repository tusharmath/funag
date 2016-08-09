/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import css from './header.style'
import IconButton from '../fa-icon-button/fa-icon-button'

const view = ({ROUTER}) => O.just(
  <div className={css.headerContainer}>
    <div className={css('rowMiddle')}>
      <div className={css('flexSpread')}>
        <div>
          <strong>Funag</strong>
        </div>
        <small>Unofficial soundcloud player</small>
      </div>
      <div className={css('flexSpread')}>
        <div className={css('rowRight')}>
          {IconButton('Search', ROUTER.createHref('/search'))}
        </div>
      </div>
    </div>
  </div>
)

export default ({DOM, ROUTER}) => {
  return {
    DOM: view({ROUTER})
  }
}
