/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {div} from 'cycle-maquette'
import * as SC from '../utils/SoundCloud'
import * as S from '../utils/StyleUtils'

export default duration =>
  div({style: S.stringifyStyle({...S.subtitleSTY})}, SC.durationFormat(duration))
