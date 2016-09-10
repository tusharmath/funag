/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import {BlockHeight, Palette} from '../../lib/Themes'
import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  '.input': {
    border: 'none',
    flex: '1 0 0',
    fontSize: '1rem',
    color: Palette.fg__search,
    fontWeight: '600',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'Open Sans, sans-serif',
    minHeight: `${BlockHeight}px`,
    width: '100%',
    padding: 0,
    '&::-webkit-input-placeholder': {
      color: Palette.fg__search_placeholder
    }
  },
  '.container': {
    color: Palette.fg__search,
    margin: '0',
    display: 'flex'
  },
  '.icon-button': {
    height: `${BlockHeight}px`,
    width: `${BlockHeight}px`,
    margin: 0,
    padding: 0,
    border: 0,
    background: 0,
    '&:focus': {
      outline: 0
    }
  }
})
