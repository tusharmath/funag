/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import './html.style'
import {sheets} from '../../lib/CreateStyle'
import * as flex from 'flex-jss'
import h from 'snabbdom/h'

const linkCSS = href => h('link', {
  attrs: {
    rel: 'stylesheet',
    type: 'text/css',
    href
  }
})

export default ({main, title, bundle, manifest, sw}) => h('html', [
  h('head', [
    h('title', title),
    h('style', sheets.toString()),
    h('style', flex.asHtmlStyleString()),
    h('script', {attrs: {src: sw}}),
    linkCSS('//fonts.googleapis.com/css?family=Open+Sans:300,400,600'),
    linkCSS('//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'),
    h('link', {attrs: {rel: 'manifest', href: manifest}})
  ]),
  h('body', [
    h('#container', [main]),
    h('script', {attrs: {src: sw}})
  ])
])
