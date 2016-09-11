import {BubblingEventType} from '../../lib/CustomEventType'
/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

export const PlayEvent = BubblingEventType('FunagPlayEvent')
export const PauseEvent = BubblingEventType('FunagPauseEvent')
export const SeekEvent = BubblingEventType('FunagSeekEvent')
