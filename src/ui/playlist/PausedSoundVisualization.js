/**
 * Created by imamudin.naseem on 03/05/16.
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
}, [ul('.playing-animation', {style: {...S.size(17)}}, [
  li('.pause-animation'), li('.pause-animation'), li('.pause-animation')
])])
