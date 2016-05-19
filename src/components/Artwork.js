/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../utils/StyleUtils'
import * as F from '../utils/Flexbox'

export const DefaultArtwork = size => div({style: {...S.block(size), color: '#ccc', backgroundColor: '#F6F6F6'}}, [
  div(S.fa('music'))
])
export default (url, size = 50) =>
  url ? div({
    style: {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      backgroundSize: '100%',
      ...S.size(size)
    }
  }) : DefaultArtwork(size)

export const DefaultArtWorkLarge = div({
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: '#ccc',
    backgroundColor: 'rgb(249, 249, 249)',
    ...F.RowMiddle
  }
}, [
  div(S.fa('music', 2))
])

export const ArtWorkLarge = url => div({
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
})