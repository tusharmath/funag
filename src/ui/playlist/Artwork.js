/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'

const DefaultArtwork = div({style: {...S.block(50), color: '#ccc', backgroundColor: '#F6F6F6'}}, [
  div(S.fa('music'))
])
export default url =>
  url ? div({
    style: {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      backgroundSize: '100%',
      ...S.size(50)
    }
  }) : DefaultArtwork
