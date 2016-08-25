/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'
import {addRules} from '../../lib/JSSHelpers'
import {BlockHeight} from '../../lib/Themes'

export default addRules({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${BlockHeight}px`,
    width: `${BlockHeight}px`
  },
  loader: {
    height: '30px',
    width: '30px',
    border: '3px solid rgba(255, 255, 255, 1)',
    borderLeftColor: 'rgba(0, 0, 0, 0.1)',
    transform: 'translateZ(0)',
    animation: 'load8 1s infinite linear',
    '&, &:after': {
      borderRadius: '50%'
    }
  },
  '@keyframes load8': {
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'}
  }
})
