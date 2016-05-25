/**
 * Created by tushar.mathur on 18/05/16.
 */

'use strict'

export const makeModelDriver = init => {
  return function create (value$) {
    return {
      value$: value$.startWith(init).distinctUntilChanged(),
      isolateSink (value$, scope) {
        return value$
          .distinctUntilChanged()
          .map(value => ({value, scope}))
      },
      isolateSource (source, scope) {
        const value$ = source.value$
          .filter(x => x.scope === scope)
          .pluck('value')
          .distinctUntilChanged()
        return create(value$)
      }
    }
  }
}
