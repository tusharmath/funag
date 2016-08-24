/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import h from 'hyperscript'

export default ($) => (
  h('div.scrobber',
    h('div.scrobberTrack',
      h('div.scrobberIcon', {
        ontouchstart: $.__onTouchStart.bind($),
        ontouchmove: $.__onTouchMove.bind($),
        ontouchend: $.__onTouchEnd.bind($)
      })
    )
  )
)
