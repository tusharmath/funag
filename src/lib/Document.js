/**
 * Created by tushar.mathur on 21/08/16.
 */

'use strict'

import root from 'window-or-global'
import isNode from 'detect-node'

const document = {
  registerElement () {}
}
export default isNode ? document : root['document']
