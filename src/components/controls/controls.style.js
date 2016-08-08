/**
 * Created by imamudin.naseem on 08/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {Palette} from '../../lib/Themes'

export default create({
  container: {
    transform: 'translateZ(0)',
    boxShadow: Palette.sd__intense,
    backgroundColor: Palette.bg__control,
    color: '#FFF'
  },
  translateDown: {
    transform: 'translateY(20px)',
    height: '0px'
  },
  translateUp: {
    transition: 'height 200ms linear'
  }
})
