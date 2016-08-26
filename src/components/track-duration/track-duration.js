/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import css from './track-duration.style'
import {h} from '@cycle/dom'
import * as SC from '../../lib/SoundCloud'

export default duration =>
  h(`div.${css.trackDuration}`, [SC.durationFormat(duration)])
