/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'

export default ({width, text}) =>
  div({style: {...S.subtitleSTY, width: `${width}px`, textAlign: 'center'}}, [text])
