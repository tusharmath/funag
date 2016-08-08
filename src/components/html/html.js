/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import './html.style'
import {sheets} from '../../lib/CreateStyle'

export default ({html, title, bundle, manifest, sw}) =>
  <html>
  <head>
    <title>{title}</title>
    <script src={sw}></script>
    <style id='server-side-css'>{sheets.toString()}</style>
    <meta name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no'/>
    <link rel='manifest' href={manifest}/>
    <link rel='stylesheet' type='text/css'
          href='//fonts.googleapis.com/css?family=Open+Sans:300,400,600'/>
    <link rel='stylesheet' type='text/css'
          href='//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'/>
  </head>
  <body>
  <div id='container'>{html}</div>
  <script src={bundle}></script>
  </body>
  </html>