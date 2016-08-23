/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import css from './scrobber.style'

export default ($) => (
  <div classNames={[css.scrobber, 'scrobber']}
       key='scrobber'>
    <div className={css(css.scrobberTrack, 'scrobberTrack')}>
      <div className={css.scrobberIcon}
           on-touchStart={$.__onTouchStart.bind($)}
           on-touchstart={$.__onTouchStart.bind($)}
           on-touchmove={$.__onTouchMove.bind($)}
           on-touchend={$.__onTouchEnd.bind($)}
      />
    </div>
  </div>
)
