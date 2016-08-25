/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import jss, {Jss} from 'jss'
import preset from 'jss-preset-default'
import * as R from 'ramda'

jss.setup(preset())

const namedStyleSheet = jss.createStyleSheet({})
const unnamedStyleSheet = jss.createStyleSheet({}, {named: false})

export const addUnnamedRules = (rules) => {
  unnamedStyleSheet.addRules(rules)
}
export const addRules = (rules) => {
  const _css = R.unapply(R.join(' '))
  namedStyleSheet.addRules(rules)
  Object.assign(_css, namedStyleSheet.classes)
  return _css
}
export const globalSheet = jss.sheets
export const createStyleSheet = (styles) => {
  const jss = new Jss(preset())
  return jss.createStyleSheet(styles, {named: false})
}
