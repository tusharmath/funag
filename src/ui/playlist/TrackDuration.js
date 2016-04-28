/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import * as SC from '../../Utils/SoundCloud'
import * as S from '../../Utils/StyleUtils'

export default duration =>
  div({style: {...S.subtitleSTY, padding: '0 10px'}}, SC.durationFormat(duration))
