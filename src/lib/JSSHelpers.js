/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import jss, {Jss} from 'jss'
import preset from 'jss-preset-default'
import * as R from 'ramda'

jss.setup(preset())

export const addUnnamedRules = (rules) => {
  jss.createStyleSheet(rules, {named: false})
}
export const addRules = (rules) => {
  const _css = R.unapply(R.join(' '))
  Object.assign(_css, jss.createStyleSheet(rules).classes)
  return _css
}
export const globalSheet = jss.sheets
export const createStyleSheet = (styles) => {
  const jss = new Jss(preset())
  return jss.createStyleSheet(styles, {named: false})
}
