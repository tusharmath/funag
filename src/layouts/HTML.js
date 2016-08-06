/**
 * Created by tushar.mathur on 09/05/16.
 */

'use strict'
import {
  html,
  head,
  title,
  body,
  div,
  meta,
  link,
  style,
  script
} from '@cycle/dom'

export default ({__html, __title, bundle}) =>
  html([
    head([
      title(__title),
      style([
        `
        body, html {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: Open Sans, sans-serif;
          font-weight: 400;
          color: rgb(51, 51, 51);
          -webkit-font-smoothing: antialiased;
          -webkit-user-select: none;
          overflow: hidden;
        }
        
        input {
          font-family: Open Sans, sans-serif;
        }
        
        input::-webkit-input-placeholder{
          color: inherit;
          opacity: 0.5;
        }
        
        div, form {
          box-sizing: border-box;
        }
        
        #container {
          height: 100%;
        }
        @keyframes horizontal-motion { 
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        `
      ]),
      meta({
        attrs: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        }
      }),
      link({
        attrs: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//fonts.googleapis.com/css?family=Open+Sans:300,400,600'
        }
      }),
      link({
        attrs: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
        }
      })
    ]),
    body([
      div('#container', [__html]),
      script({attrs: {src: bundle}})
    ])
  ])
