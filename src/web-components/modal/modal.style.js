/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {BlockSpace} from '../../lib/Themes'
export default createStyleSheet({
  '.modal-container': {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    transition: 'all 300ms ease-in',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  '.slot-container': {
    backgroundColor: '#FFF',
    padding: BlockSpace,
    boxShadow: '0px -4px 4px 0px rgba(0, 0, 0, 0.25)',
    transition: 'all 300ms ease-in'
  },
  '.hidden': {
    '& .slot-container': {
      transform: 'translateY(105%)'
    },
    '&.modal-container': {
      backgroundColor: 'transparent'
    }
  }
})
