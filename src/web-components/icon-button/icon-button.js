/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import style from './icon-button.style'
import h from 'hyperscript'

const view = (icon) => h('i.material-icons', icon)
const materialDesign = () => h(
  'style',
  '@import url(\'https://fonts.googleapis.com/icon?family=Material+Icons\')'
)

registerWC('x-icon-button', {
  createdCallback () {
    this.__shadowRoot = this.createShadowRoot()
    this.__shadowRoot.appendChild(materialDesign())
    this.__shadowRoot.appendChild(h('style', style.toString()))
    this.__shadowRoot.appendChild(view(this.getAttribute('icon')))
  },
  __updateIcon (icon) {
    this.__shadowRoot.querySelector('.material-icons').innerHTML = icon
  },
  attributeChangedCallback (name, _, icon) {
    if (name === 'icon') this.__updateIcon(icon)
  }
})
