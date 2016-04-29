/**
 * Created by tushar.mathur on 29/04/16.
 */

'use strict'

import {Observable} from 'rx'

export default getter => {
  return Observable.defer(() => getter()).shareReplay(1)
}
