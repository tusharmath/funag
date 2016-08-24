/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import jss, {Jss} from 'jss'
import preset from 'jss-preset-default'
import * as R from 'ramda'

jss.setup(preset())

export const attachStyleSheet = (styles, options) => {
  const css = R.unapply(R.join(' '))
  Object.assign(css, jss.createStyleSheet(styles, options).classes)
  return css
}
export const globalSheet = jss.sheets
export const createStyleSheet = (styles) => {
  const jss = new Jss(preset())
  return jss.createStyleSheet(styles, {named: false})
}
