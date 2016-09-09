/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import './html.style'
import h from 'hyperscript'
import {globalSheet} from '../../lib/JSSHelpers'
import * as flex from 'flex-jss'
import Header from '../header/header'
import loadSW from '../../lib/loadSW'

export default ({title, bundle, manifest, sw}) => {
  return h('html', [
    h('head', [
      h('title', [title]),
      h('style', [globalSheet.toString()]),
      h('style', [flex.asHtmlStyleString()]),
      h('script', loadSW(sw)),
      h('meta', {
        attrs: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }
      }),
      h('link', {attrs: {rel: 'manifest', href: '/manifest.json'}}),
      h('link', {
        attrs: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//fonts.googleapis.com/css?family=Open+Sans:300,400,600'
        }
      })
    ]),
    h('body', [
      Header,
      h(`funag-app`),
      h('script', {attrs: {src: bundle}})
    ])
  ])
}
