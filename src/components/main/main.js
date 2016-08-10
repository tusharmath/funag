/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
import Home from '../home/home'
import Discover from '../discover/discover'

const ROUTES = {
  '/': Home,
  '/search': Discover
}
export const createIntent = R.curry((page$, type) => page$
  .filter(R.has(type))
  .flatMapLatest(R.prop(type)))

export default function ({DOM, AUDIO, HTTP, ROUTER}) {
  const createSources = R.compose(
    R.merge({DOM, AUDIO, HTTP}),
    R.objOf('ROUTER'),
    ROUTER.path.bind(ROUTER)
  )
  const createPage = ({path, value}) => value(createSources(path))
  const page$ = ROUTER.define(ROUTES).map(createPage).shareReplay(1)
  const getIntent = createIntent(page$)

  return {
    DOM: getIntent('DOM').shareReplay(1),
    HTTP: getIntent('HTTP').map(R.merge({accept: 'application/json'})),
    AUDIO: getIntent('AUDIO'),
    EVENTS: getIntent('EVENTS')
  }
}
