/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div, i, small} from '@cycle/dom'
import * as S from '../../lib/StyleUtils'
import * as F from '../../lib/Flexbox'
import PlaybackMetaInfo from './PlaybackMetaInfo'

const BUTTON_SIZE = 60

const controlsSTY = {
  ...F.RowSpaceAround,
  width: '100%',
  color: '#fff'
}

const buttonSTY = {
  ...S.size(BUTTON_SIZE, BUTTON_SIZE),
  ...F.ColMiddle
}

const primaryButtonSTY = {
  ...buttonSTY,
  fontSize: '2em'
}

const secondaryButtonSTY = {
  ...buttonSTY,
  fontSize: '1em'
}

export default () => {
  return {
    DOM: PlaybackMetaInfo().DOM.map(info =>
      div({}, [
        div({style: F.RowSpaceAround}, [
          div({style: controlsSTY}, [
            i('.fa.fa-backward', {style: secondaryButtonSTY}),
            i('.fa.fa-play', {style: primaryButtonSTY}),
            i('.fa.fa-forward', {style: secondaryButtonSTY})
          ])
        ]),
        info
      ])
    )
  }
}
