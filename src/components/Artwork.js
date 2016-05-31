/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div, ul, li} from 'cycle-snabbdom'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'

export const Placeholder = div({
  style: {
    ...S.block(50),
    margin: T.BlockSpace,
    color: '#ccc',
    backgroundColor: '#F6F6F6'
  }
}, [div(S.fa('music'))])
export const ArtworkOverlay = isAnimated => {
  const style = {
    ...S.block(T.BlockHeight - T.BlockSpace),
    margin: T.BlockSpace,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }

  return div('.fade-in', {style}, [
    ul('.playing-animation' + isAnimated, {style: {...S.size(17)}}, [
      li({}), li({}), li({})
    ])
  ])
}
export const PlayingArtwork = ArtworkOverlay('')
export const PausedArtwork = ArtworkOverlay('.pause-animation')
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
