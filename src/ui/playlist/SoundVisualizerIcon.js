/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import {ul, li, div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'

export default (state) => {
  const pauseAnimaton = ['PAUSED', 'LOADING'].includes(state) ? '.pause-animation' : null
  return div({
    className: 'fade-in',
    style: {
      ...S.absolute(),
      ...S.block(50),
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  }, [ul('.playing-animation', {style: {...S.size(17)}}, [
    li(pauseAnimaton), li(pauseAnimaton), li(pauseAnimaton)
  ])])
}
