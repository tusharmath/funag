/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {Palette} from '../../lib/Themes'

export default addRules({
  main: {
    height: '100%'
  },
  controlsContainer: {
    boxShadow: Palette.zDepth__1,
    backgroundColor: Palette.bg__control,
    color: Palette.fg__control,
    position: 'fixed',
    width: '100%',
    bottom: 0
  },
  trackTitle: {
    fontWeight: 'bold'
  },
  trackArtist: {
    color: Palette.fg__playbackInfo__light,
    fontSize: '0.8rem',
    fontWeight: 'bold'
  }
})
