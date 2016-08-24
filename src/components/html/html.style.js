/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {attachStyleSheet} from '../../lib/JSSHelpers'

export default attachStyleSheet({
  'body, html': {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0
  },

  body: {
    fontFamily: ' Open Sans, sans-serif',
    fontWeight: 400,
    color: 'rgb(51, 51, 51)',
    WebkitFontSmoothing: 'antialiased',
    WebkitUserSelect: 'none',
    overflow: 'hidden'
  },

  input: {
    fontFamily: 'Open Sans, sans-serif'
  },

  'input::-webkit-input-placeholder': {
    color: 'inherit',
    opacity: 0.5
  },

  'div, form': {
    boxSizing: 'border-box'
  },

  '#container': {
    height: '100%'
  },

  '.fade-in': {
    animation: 'fade-in 500ms 1 linear'
  },

  '@keyframes fade-in': {
    from: {opacity: 0},
    to: {opacity: 1}
  }
}, {named: false})
