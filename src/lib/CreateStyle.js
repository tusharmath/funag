/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export const createStyle = styles => jss.createStyleSheet(styles).attach().classes
export const createGlobalStyle = styles => jss.createStyleSheet(styles, {named: false}).attach().classes
export const sheets = jss.sheets
