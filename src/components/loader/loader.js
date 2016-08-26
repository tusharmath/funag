/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import css from './loader.style'
import {h} from '@cycle/dom'

export default () => (
  h(`div.${css.loaderContainer}`, [
    h(`div.${css.loader}`)
  ])
)
