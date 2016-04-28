/**
 * Created by imamudin.naseem on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import './ballScaleRipple.less'

export const BufferingLoader = div(
  '.ball-scale-ripple-multiple',
  {style: {width: '50px', height: '50px'}}, [
    div(), div(), div()
  ])
