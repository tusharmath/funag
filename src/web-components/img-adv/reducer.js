/**
 * Created by imamudin.naseem on 07/09/16.
 */

'use strict'

const assign = (obj, params) => Object.assign({}, obj, params)

export default (state, {type, params}) => {
  switch (type) {
    case '@@rwc/attr/src':
      return assign(state, {src: params})
    case '@@rwc/attr/slot':
      return assign(state, {slot: params})
    case 'LOAD':
      return assign(state, {loaded: true})
    case 'ERROR':
      return assign(state, {errored: true})
    default:
      return state
  }
}
