/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {createStyle} from '../../lib/CreateStyle'
import * as F from '../../lib/Flexbox'

export default createStyle({
  animatedBG: {
    background: 'linear-gradient(to right , rgb(245, 245, 245), #fff)',
    animation: 'horizontal-motion 1000ms linear infinite',
    backgroundSize: '400%'
  },
  square50: {
    extend: 'animatedBG',
    height: '50px', width: '50px'
  },
  line100: {
    extend: 'animatedBG',
    height: '1em', width: '100%'
  },
  line75: {
    extend: 'animatedBG',
    height: '1em', width: '75%'
  },
  lineCol: {
    flex: '1 0 0',
    margin: '0 10px',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  placeholder: {
    ...F.RowLeft,
    padding: '10px',
    alignItems: 'center',
    borderBottom: '1px solid rgb(249, 246, 246)',
    borderRadius: '2px'
  }
})
