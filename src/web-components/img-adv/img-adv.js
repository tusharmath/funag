/**
 * Created by imamudin.naseem on 02/09/16.
 */

'use strict'
import h from 'snabbdom/h'
import patcher from '../../lib/snabbdom-patcher'
import style from './img-adv.style'
import update from './reducer'
import rwc from 'rwc'

const init = () => ({})
const view = (state, dispatch) => {
  const slot = h('slot', {props: {name: state.slot}})
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
const proto = rwc.createWCProto(patcher(style), {init, view, update})

/* global HTMLElement */
const html = Object.create(HTMLElement.prototype)
const CounterHTMLComponent = Object.assign(html, proto)

/* global document  */
document.registerElement('x-img-adv', {prototype: CounterHTMLComponent})
