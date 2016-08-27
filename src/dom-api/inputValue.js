/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

export default $el => $el
  .events('keyup').map(x => x.target.value).distinctUntilChanged()
