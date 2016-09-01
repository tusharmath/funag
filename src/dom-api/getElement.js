/**
 * Created by imamudin.naseem on 01/09/16.
 */

'use strict'
import R from 'ramda'

export default (DOM, selector) =>
  DOM
    .select(selector)
    .elements()
    .map(R.head)
