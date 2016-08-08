/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import path from 'path'
import * as fs from 'fs'
import hb from 'handlebars'
import './flex-box'
import './reset.style'

export default hb.compile(fs.readFileSync(path.resolve(__dirname, 'html.hbs')).toString())
