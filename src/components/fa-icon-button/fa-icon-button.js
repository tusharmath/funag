/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import css from './fa-icon-button.style'
export default (icon, href = '/#/', dim) => (
  <a href={href} className={css.faLink}>
    <div className='colMiddle'>
      <i className={css('fa', `fa-${icon}`)}/>
    </div>
  </a>
)
