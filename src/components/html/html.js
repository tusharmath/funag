/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import './html.style'
import {sheets} from '../../lib/CreateStyle'
import * as flex from 'flex-jss'
import loadSW from '../../lib/loadSW'

export default ({html, title, bundle, manifest, sw}) =>
  <html>
  <head>
    <title>{title}</title>
    <style id='server-side-css'>{sheets.toString()}</style>
    <style>{flex.asHtmlStyleString()}</style>
    <script>{loadSW(sw)}</script>
    <meta name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no'/>
    <link rel='manifest' href={manifest}/>
    <link rel='stylesheet' type='text/css'
          href='//fonts.googleapis.com/css?family=Open+Sans:300,400,600'/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"/>
  </head>
  <body>
  <div id='container'>{html}</div>
  <script src={bundle}></script>
  </body>
  </html>
