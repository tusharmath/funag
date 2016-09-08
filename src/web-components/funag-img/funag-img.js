/**
 * Created by imamudin.naseem on 02/09/16.
 */

'use strict'
import h from 'snabbdom/h'
import R from 'ramda'

const init = () => ({
  loaded: false,
  errored: false,
  src: null
})
const view = (state, dispatch) => {
  const slot = h('slot')
  const img =
    h('img.container',
      {
        style: {
          opacity: Number(state.loaded)
        },
        props: {src: state.src},
        on: {
          load: dispatch('LOAD'),
          error: dispatch('ERROR')
        }
      }
    )
  return h('div', [state.errored ? slot : img])
}

const update = (state, {type, params}) => {
  switch (type) {
    case '@@rwc/attr/src':
      return R.assoc('src', params, state)
    case 'LOAD':
      return R.assoc('loaded', true, state)
    case 'ERROR':
      return R.assoc('errored', true, state)
    default:
      return state
  }
}

export default {init, update, view}
