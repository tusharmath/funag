/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import Scrobber from '../scrobber/scrobber'
import Playback from '../playback/playback'
import view from './controls.view'
import model from './controls.model'
import mergePropStream from '../../lib/mergePropStream'
import css from './controls.style'
import getElementBCR from '../../dom-api/getElementBCR'
import {SET_CONTROL_HEIGHT} from '../../redux-lib/actions'

export const getControlHeight = ({DOM}) => {
  return getElementBCR(DOM, `.${css.controlsContainer}`).pluck('height')
}

export default (sources) => {
  const _model = model(sources)
  const playback = Playback(sources)
  const scrobber = Scrobber(R.merge(sources, _model))
  const height$ = getControlHeight(sources)
  return {
    AUDIO: mergePropStream('AUDIO', playback, scrobber),
    DOM: view(R.merge({playback, scrobber}, _model)),
    STORE: O.merge(scrobber.STORE, height$.map(SET_CONTROL_HEIGHT))
  }
}
