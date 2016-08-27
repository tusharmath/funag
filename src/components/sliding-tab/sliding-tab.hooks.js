/**
 * Created by tushar.mathur on 27/08/16.
 */

'use strict'

export default class SlidingTabHooks {
  constructor () {
    this.onTouchMove = this.onTouchMove.bind(this)
  }

  get sectionHooks () {}

  get containerHooks () {}

  onTouchMove (e) {
    console.log(this)
  }
}
