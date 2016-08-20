/**
 * Created by tushar.mathur on 19/08/16.
 */

'use strict'

export class UpdateStyle {
  constructor (el, style) {
    this.__el = el
    this.__style = style
  }

  static of (el$, style$) {
    return style$.withLatestFrom(el$)
      .map(([style, el]) => new UpdateStyle(el, style))
  }

  execute () {
    const style = this.__el.style
    Object.assign(style, this.__style)
  }
}

export const quickUpdateDOMDriver = source$ => {
  source$.subscribe(update => update.execute())
  return {UpdateStyle}
}
