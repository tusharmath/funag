/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {SmartComponent} from '../../lib/SmartComponent'
import css from './main.style'

export default class Main extends SmartComponent {
  render () {
    return (
      <div className={css.main}>
        <h1>Hello</h1>
      </div>
    )
  }
}
