/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import createAction from '../lib/createAction'

// TRACKS
export const SELECT_TRACK = createAction('SELECT_TRACK')
export const APPLY_FILTER = createAction('APPLY_FILTER')
export const CLEAR_FILTER = createAction('CLEAR_FILTER')
export const SET_TRACKS = createAction('SET_TRACKS')

// VIEW
export const SHOW_SEARCH = createAction('SHOW_SEARCH_BOX')
export const HIDE_SEARCH = createAction('HIDE_SEARCH_BOX')
