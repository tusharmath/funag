/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export const create = styles => jss.createStyleSheet(styles).classes
export const createGlobal = styles => jss.createStyleSheet(styles, {named: false}).attach().classes
export const sheets = jss.sheets
