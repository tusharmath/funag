/**
 * Created by tushar.mathur on 09/08/16.
 */

'use strict'

import * as R from 'ramda'
import * as Rx from './RxFP'

const getResponse = R.compose(Rx.share, Rx.pluck('body'), Rx.switchIt)
export default R.curry((HTTP, category) => getResponse(HTTP.select(category)))
