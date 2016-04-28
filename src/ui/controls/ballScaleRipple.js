/**
 * Created by imamudin.naseem on 28/04/16.
 */

'use strict'

import {ul, li, style} from '@cycle/dom'
import './ball-.less'

export const Visualizer = ul(
  '.animate-sound-visualizer',
  {style: {width: '15px', height: '15px'}}, [
    li(), li(), li(), li()
  ])
