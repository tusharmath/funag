/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import {BubblingEventType} from '../../lib/CustomEventType'

export const Request = BubblingEventType('fg-http-request')
export const Response = BubblingEventType('fg-http-response')
