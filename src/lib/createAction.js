/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

export default name => {
  const action = params => ({type: action, params})
  action.toString = () => name
  return action
}
