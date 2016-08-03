/**
 * Created by tushar.mathur on 17/05/16.
 */

import {Observable} from 'rx'
import raf from 'raf'

export default DOM$ => {
  return DOM$.flatMapLatest(view => Observable.fromCallback(raf)().map(view))
}
