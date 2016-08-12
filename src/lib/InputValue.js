/**
 * Created by tushar.mathur on 09/08/16.
 */

'use strict'

export default $el => $el.events('keyup').map(x => x.target.value).distinctUntilChanged()
