/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import * as S from '../../lib/StyleUtils'
import css from './artwork.style'
export const Placeholder = (
  <div className={css.placeholder}>
    <div>{S.fa('music_note')}</div>
  </div>
)
export const ArtworkOverlay = isAnimated => (
  <div className={S.css('fade-in', css.container)}>
    <ul className={S.css(css.playingAnimation, isAnimated)}>
      <li/>
      <li/>
      <li/>
    </ul>
  </div>
)
export const PlayingArtwork = ArtworkOverlay('')
export const PausedArtwork = ArtworkOverlay('pause-animation')
export const DefaultArtwork = url =>
  url ? <div className={css.artwork}
             style={{backgroundImage: `url(${url})`}}></div> : Placeholder
