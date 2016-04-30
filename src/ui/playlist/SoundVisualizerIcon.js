/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import {ul, li, div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'

export default div({
  className: 'fade-in',
  style: {
    ...S.absolute(),
    ...S.block(50),
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}, [ul('.animate-sound-visualizer', {style: {...S.size(17)}}, [
  li(), li(), li()
])])
