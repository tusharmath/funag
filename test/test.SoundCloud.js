/**
 * Created by tushar.mathur on 30/04/16.
 */

'use strict'

import test from 'ava'
import * as SC from '../src/lib/SoundCloud'

test('durationFormat()', t => {
  t.is(SC.durationFormat(5000), '0:50')
  t.is(SC.durationFormat(60000), '1:00')
  t.is(SC.durationFormat(645000), '10:45')
})
