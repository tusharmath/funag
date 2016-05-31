/**
 * Created by tushar.mathur on 29/05/16.
 */

'use strict'
import test from 'ava'
import {matches, Play, Pause} from '../src/drivers/audio'

test('matches', t => {
  t.true(matches('PLAY')({type: 'PLAY'}))
  t.false(matches('PLAY')({type: 'PAUSE'}))
})

test('Play/Pause', t => {
  t.deepEqual(Play('abc'), {type: 'PLAY', src: 'abc'})
  t.deepEqual(Pause('abc'), {type: 'PAUSE', src: 'abc'})
})
