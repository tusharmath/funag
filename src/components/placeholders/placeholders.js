/**
 * Created by tushar.mathur on 10/05/16.
 */

'use strict'
import css from './placeholders.style'

export const PlaylistItem = (
  <div className={css(css.placeholder, 'rowLeft')}>
    <div className={css.square50}></div>
    <div className={css.lineCol}>
      <div className={css.line100}></div>
      <div className={css.line75}></div>
    </div>
  </div>
)
