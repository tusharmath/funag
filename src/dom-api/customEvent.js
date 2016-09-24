/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import CustomEvent from '../lib/CustomEvent'

export default (name, detail) => new CustomEvent(
  name, {bubbles: true, detail}
)
