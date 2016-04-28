/**
 * Created by imamudin.naseem on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import './BallScaleRipple.less'

export default (dim = 1) =>
  div('.ball-scale-ripple-multiple',
    {style: {width: `${dim}em`, height: `${dim}em`}}, [
      div(), div(), div()
    ])


