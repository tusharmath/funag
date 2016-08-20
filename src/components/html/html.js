/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import * as flex from 'flex-jss'
import R from 'ramda'
import './html.style'
import {sheets} from '../../lib/CreateStyle'
import h from 'snabbdom/h'

const attrTag = R.curry((type, attrs) => h(type, {attrs}))
const hLink = attrTag('link')
const hLinkCSS = R.compose(
  hLink,
  R.merge({rel: 'stylesheet', type: 'text/css'}),
  R.objOf('href')
)

export default ({main, title, bundle, manifest, sw}) => h('html', [
  h('head', [
    h('title', title),
    h('meta', {
      attrs: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      }
    }),
    h('style', sheets.toString()),
    h('style', flex.asHtmlStyleString()),
    h('script', {attrs: {src: sw}}),
    hLinkCSS('//fonts.googleapis.com/css?family=Open+Sans:300,400,600'),
    hLinkCSS('https://fonts.googleapis.com/icon?family=Material+Icons'),
    hLink({rel: 'manifest', href: manifest})
  ]),
  h('body', [
    h('#container', [main]),
    h('script', {attrs: {src: sw}})
  ])
])
