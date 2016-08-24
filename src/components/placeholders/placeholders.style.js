/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {attachStyleSheet} from '../../lib/JSSHelpers'

export default attachStyleSheet({
  animatedBG: {
    background: 'linear-gradient(to right , rgb(245, 245, 245), #fff)',
    animation: 'horizontal-motion 1000ms linear infinite',
    backgroundSize: '400%'
  },
  square50: {
    extend: 'animatedBG',
    height: '50px',
    width: '50px'
  },
  line100: {
    extend: 'animatedBG',
    height: '1rem',
    width: '100%'
  },
  line75: {
    extend: 'animatedBG',
    height: '1rem',
    width: '75%'
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
    padding: '10px',
    alignItems: 'center',
    borderBottom: '1px solid rgb(249, 246, 246)',
    borderRadius: '2px'
  },
  '@keyframes horizontal-motion': {
    '0%': {backgroundPosition: '0% 50%'},
    '50%': {backgroundPosition: '100% 50%'},
    '100%': {backgroundPosition: '0% 50%'}
  }
})
