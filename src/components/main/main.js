/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import h from 'snabbdom/h'

export const render = () => h('#container.two.classes', [
  h('span', {
    style: {
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  }, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
])

