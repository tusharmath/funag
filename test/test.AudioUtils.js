/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {ReactiveTest} from 'rx'
import test from 'ava'
import * as A from '../src/Utils/AudioUtils'
const {onNext, onComplete} = ReactiveTest

test('isSongPlaying()', t => {
  t.is(typeof  A.isSongPlaying, 'function')
})
