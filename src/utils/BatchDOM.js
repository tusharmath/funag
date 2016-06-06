/**
 * Created by tushar.mathur on 17/05/16.
 */

import {Observable} from 'rxjs'
import raf from 'raf'

export default DOM$ => {
  return DOM$.switchMap(view => Observable.fromCallback(raf)().map(view))
}
