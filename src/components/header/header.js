/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import Tab from '../tab/tab'
import view from './header.view'
import css from './header.style'
import getElementBCR from '../../dom-api/getElementBCR'
import {SET_HEADER_HEIGHT} from '../../redux-lib/actions'

const getHeaderHeight = DOM => {
  return getElementBCR(DOM, `.${css.header}`).pluck('height')
}

const intent = ({DOM, tabs}) => {
  return {
    STORE: O.merge(
      getHeaderHeight(DOM).map(SET_HEADER_HEIGHT),
      tabs.STORE
    )
  }
}

export default (sources) => {
  const tabs = Tab(sources)
  return R.merge(intent(R.merge(sources, {tabs})), {DOM: view({tabs})})
}
