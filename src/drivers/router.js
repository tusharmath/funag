/**
 * Created by tushar.mathur on 26/04/16.
 */
/* global location */

'use strict'

import {Observable} from 'rx'
import Route from 'route-parser'

export const routerDriver = source$ => {
  source$.subscribe(x => (location.hash = x))
  const hashChange$ = Observable.fromEvent(window, 'hashchange').startWith(null).map(() => location.hash.replace('#', ''))
  return {
    match (pattern) {
      const route = new Route(pattern)
      return hashChange$.map(hash => route.match(hash)).filter(Boolean)
    }
  }
}
