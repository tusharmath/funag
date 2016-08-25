/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import {applyMiddleware, createStore} from 'redux'
import createLogger from 'redux-logger'
import {Observable as O} from 'rx'
import R from 'ramda'

const middlewares = applyMiddleware(createLogger())
export const createReduxDriver = (reducer = x => x) => {
  const store = createStore(
    reducer,
    APP_CONFIG.reduxLogger ? middlewares : R.identity
  )
  const value$ = O.fromEventPattern(
    cb => store.subscribe(() => cb(store.getState())),
    dispose => dispose()
  ).startWith(store.getState()).shareReplay(1)
  return actions => {
    actions.subscribe(action => store.dispatch(action))
    const select = path => {
      const _path = R.is(String, path) ? path.split('.') : path
      return value$.map(R.path(_path)).distinctUntilChanged()
    }
    return {select, value$}
  }
}
