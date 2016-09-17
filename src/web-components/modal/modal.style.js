/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
export default createStyleSheet({
  '.modal-container': {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%'
  },
  '.hidden': {
    display: 'none'
  },
  '.dark-overlay': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0
  },
  '.slot-container': {
    backgroundColor: '#FFF',
    boxShadow: '0px -4px 4px 0px rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
})
