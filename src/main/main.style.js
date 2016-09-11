/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addUnnamedRules, addRules} from '../lib/JSSHelpers'
import {BlockSpace, Palette, BlockHeight} from '../lib/Themes'
import {jc_c as jcc, col} from 'flex-jss'

addUnnamedRules({
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
    WebkitUserSelect: 'none'
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

export default addRules({
  headerContainer: {
    backgroundColor: Palette.bg__header,
    boxShadow: Palette.zDepth__1,
    color: Palette.fg__header,
    width: '100%',
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  headerText: {
    extend: [col, jcc],
    paddingLeft: BlockSpace,
    height: BlockHeight
  }
})
