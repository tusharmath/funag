import {createWCEvent} from '../../lib/createCustomEvent'
/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

export const PlayEvent = createWCEvent('FunagPlayEvent')
export const PauseEvent = createWCEvent('FunagPauseEvent')
export const SeekEvent = createWCEvent('FunagSeekEvent')
