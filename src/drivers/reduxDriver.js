/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import {applyMiddleware, createStore} from 'redux'
import createLogger from 'redux-logger'
import {Observable as O} from 'rx'
import R from 'ramda'

export const createReduxDriver = (initialState, reducer = x => x) => {
  const store = createStore(reducer, initialState, applyMiddleware(createLogger()))
  const store$ = O.fromEventPattern(
    cb => store.subscribe(() => cb(store.getState())),
    dispose => dispose()
  )
  return actions => {
    actions.subscribe(action => store.dispatch(action))
    const select = path => {
      const _path = R.is(String, path) ? path.split('.') : path
      return store$.map(R.path(_path)).distinctUntilChanged()
    }
    return {select}
  }
}
