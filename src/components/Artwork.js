/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div, ul, li} from 'cycle-maquette'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'

export const Placeholder = div({
  style: S.stringifyStyle({
    ...S.block(50),
    'margin': T.BlockSpace,
    'color': '#ccc',
    'background-color': '#F6F6F6'
  })
}, [div(S.fa('music'))])
export const ArtworkOverlay = isAnimated => {
  const style = S.stringifyStyle({
    ...S.block(T.BlockHeight - T.BlockSpace),
    'margin': T.BlockSpace,
    'background-color': 'rgba(255, 255, 255, 0.8)'
  })

  return div('.fade-in', {style}, [
    ul('.playing-animation' + isAnimated, {style: S.stringifyStyle({...S.size(17)})}, [
      li(), li(), li()
    ])
  ])
}
export const PlayingArtwork = ArtworkOverlay('')
export const PausedArtwork = ArtworkOverlay('.pause-animation')
export const DefaultArtwork = url =>
  url ? div({
    style: S.stringifyStyle({
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      backgroundSize: '100%',
      margin: `${T.BlockSpace}px`,
      ...S.size(50)
    })
  }) : Placeholder
