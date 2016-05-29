/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'
import _ from 'ramda'
export const inputVal = $el => $el.events('keyup').map(x => x.target.value).distinctUntilChanged()
export const action = _.curry((event, target) => ({target, event}))
