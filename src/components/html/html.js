/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import './html.style'
import {h} from '@cycle/dom'
import {globalSheet} from '../../lib/JSSHelpers'
import * as flex from 'flex-jss'
import loadSW from '../../lib/loadSW'

export default ({html, title, bundle, manifest, sw}) => {
  return h('html', [
    h('head', [
      h('title', [title]),
      h('style', [globalSheet.toString()]),
      h('style', [flex.asHtmlStyleString()]),
      h('script', [loadSW(sw)]),
      h('meta', {
        attrs: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }
      }),
      h('link', {attrs: {rel: 'manifest', href: manifest}}),
      h('link', {
        attrs: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//fonts.googleapis.com/css?family=Open+Sans:300,400,600'
        }
      }),
      h('link', {
        attrs: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//fonts.googleapis.com/icon?family=Material+Icons'
        }
      })
    ]),
    h('body', [
      h('div#container', [html]),
      h('script', {attrs: {src: bundle}})
    ])
  ])
}
