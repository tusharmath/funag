/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import css from './controls.style'

export default ({playback, scrobber, show$}) => {
  return O.combineLatest(scrobber.DOM, playback.DOM, show$)
    .map(([scrobber, playback, show, height]) =>
      <div class={{[css.hide]: !show}}
           className={css(css.controlsContainer, 'controls')}>
        {scrobber}
        {playback}
      </div>
    )
}
