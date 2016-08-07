/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import css from './track-duration.style'
import * as SC from '../../lib/SoundCloud'

export default duration =>
  <div className={css.trackDuration}>
    {SC.durationFormat(duration)}
  </div>
