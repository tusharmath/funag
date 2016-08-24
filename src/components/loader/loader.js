/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'
import css from './loader.style'
import uuid from '../../lib/uuid'
export default () => (
  <div key={uuid()} className={css.loaderContainer}>
    <div className={css.loader}></div>
  </div>
)
