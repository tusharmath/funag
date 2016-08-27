/**
 * Created by tushar.mathur on 27/08/16.
 */

'use strict'

import R from 'ramda'

const createInsertHook = R.curry((ctx, name, node) => {
  ctx[name] = node.elm
})

export default class SlidingTabHooks {
  constructor () {
    this.onTouchMove = this.onTouchMove.bind(this)
  }

  get rootHooks () {
    return {
      insert: createInsertHook(this, '__rootEL')
    }
  }

  get contentHooks () {
    return {
      insert: createInsertHook(this, '__contentEL')
    }
  }

  get controlContainerHooks () {
    return {
      insert: createInsertHook(this, '__controlContainerEL')
    }
  }

  onTouchMove () {
    console.log(this)
  }
}
