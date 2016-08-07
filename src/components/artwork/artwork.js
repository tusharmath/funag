/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../../lib/StyleUtils'
import * as T from '../../lib/Themes'
import css from './artwork.style'
export const Placeholder = div({
  style: {
    ...S.block(50),
    margin: T.BlockSpace,
    color: '#ccc',
    backgroundColor: '#F6F6F6'
  }
}, [div([S.fa('music')])])
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
  url ? div({
    style: {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      backgroundSize: '100%',
      margin: `${T.BlockSpace}px`,
      ...S.size(50)
    }
  }) : Placeholder
