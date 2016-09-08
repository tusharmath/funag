/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import css from './artwork.style'
import {h} from '@cycle/dom'
import R from 'ramda'
import SquareIcon from '../square-icon/square-icon'

export const Placeholder = () => (
  h(`div.${css.artworkPlaceholder}`, [
    SquareIcon('music_note')
  ])
)
export const ArtworkOverlay = isAnimated => (
  h(`div.${css.artworkContainer}.fade-in`, [
    h(`div.${css.playingAnimation}.${isAnimated}`,
      R.repeat(h('li'), 3)
    )
  ])
)
export const PlayingArtwork = () => ArtworkOverlay('')
export const PausedArtwork = () => ArtworkOverlay('pause-animation')
export const DefaultArtwork = url => url ? ArtworkBG(url) : Placeholder()
export const ArtworkBG = url =>
  h('funag-img', {attrs: {src: url}}, [
    h('div.fade-in', [Placeholder()])
  ])
