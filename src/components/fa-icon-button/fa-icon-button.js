/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import * as S from '../../lib/StyleUtils'
import {BlockHeight} from '../../lib/Themes'
export default (icon, dim) => (
  <div style={S.block(BlockHeight)}>
    {S.fa(icon, dim)}
  </div>
)
