/**
 * Created by tushar.mathur on 03/08/16.
 */

'use strict'

import {Observable} from 'rx'
import {makeHTMLDriver} from '@cycle/dom'
import {mockAudioDriver} from '../drivers/audio'
import {eventSinkDriver} from '../drivers/eventSink'
import noop from './/Noop'

export default {
  DOM: makeHTMLDriver(),
  AUDIO: mockAudioDriver,
  events: eventSinkDriver,
  title: noop,
  HTTP: () => Observable.never()
}
