import {createGlobal} from '../../lib/CreateStyle'
/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

export default createGlobal({
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

  '@keyframes horizontal-motion': {
    '0%': {backgroundPosition: '0% 50%'},
    '50%': {backgroundPosition: '100% 50%'},
    '100%': {backgroundPosition: '0% 50%'}
  }
})
