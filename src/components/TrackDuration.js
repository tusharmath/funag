/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import * as SC from '../lib/SoundCloud'
import * as S from '../lib/StyleUtils'

export default duration =>
  div({style: {...S.subtitleSTY}}, SC.durationFormat(duration))
