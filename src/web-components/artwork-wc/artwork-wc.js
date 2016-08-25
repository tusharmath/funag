/**
 * Created by imamudin.naseem on 24/08/16.
 */
'use strict'

import h from 'hyperscript'
import R from 'ramda'
import style from './artwork-wc.style'
import registerWC from '../../lib/registerWC'
import {DEFAULT, PAUSED, PLAYING} from '../../lib/OverlayStatus'

const SetAttributes = (el, attrs) =>
  R.compose(R.forEach(x => el.setAttribute(x[0], x[1])), R.toPairs)(attrs)
const createElement = (name, attrs) => {
  const el = document.createElement(name)
  SetAttributes(el, attrs)
  return el
}
export const Placeholder = () =>
  h('div.placeholder',
    createElement('x-square-icon', {'icon': 'music_note'})
  )

export const ArtworkOverlay = isAnimated => (
  h('div.fade-in.container',
    h(`ul.playingAnimation${isAnimated}`,
      [h('li'), h('li'), h('li')]
    )
  )
)
const Image = url => h('div.artwork', {
  style: {'background-image': `url(${url})`}
})
export const PlayingArtwork = ArtworkOverlay('')
export const PausedArtwork = ArtworkOverlay('.pause-animation')
export const DefaultArtwork = url => url ? Image(url) : Placeholder()

registerWC('x-artwork', {
  createdCallback (e) {
    this.__shadowRoot = this.createShadowRoot()
    this.__shadowRoot.appendChild(h('style', style.toString()))
    this.__shadowRoot.appendChild(h('div.wrapper'))
  },
  attributeChangedCallback () {
    const url = this.getAttribute('url')
    const status = this.getAttribute('status')
    if (url !== null && status !== null) {
      const artwork = {
        [DEFAULT]: DefaultArtwork(url),
        [PLAYING]: PlayingArtwork,
        [PAUSED]: PausedArtwork
      }
      const html = artwork[status]
      this.__shadowRoot.querySelector('.wrapper').innerHTML = ''
      this.__shadowRoot.querySelector('.wrapper').innerHTML = html.outerHTML
    }
  }
})
