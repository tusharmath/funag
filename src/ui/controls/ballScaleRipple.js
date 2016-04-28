/**
 * Created by imamudin.naseem on 28/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import './BallScaleRipple.less'

export default () => div(
    '.ball-scale-ripple-multiple',
    {style: {width: '50px', height: '50px'}}, [
      div(), div(), div()
    ])


