/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

/* global self */

import toolbox from 'sw-toolbox'

const swConfig = APP_CONFIG.sw
toolbox.precache([
  '/',
  '/soundcloud-16.png',
  '/soundcloud-32.png',
  '/soundcloud-64.png',
  '/soundcloud-128.png',
  '/soundcloud-256.png',
  '/soundcloud-512.png'
])
toolbox.router.get('/', toolbox.cacheFirst)
toolbox.router.get(/.*client.*/, toolbox.cacheFirst)

toolbox.router.get(/^.*googleapis.*$/, toolbox.cacheFirst)
toolbox.router.get(/^.*gstatic.*$/, toolbox.cacheFirst)
toolbox.router.get(/^.*bootstrapcdn.*$/, toolbox.cacheFirst)
toolbox.router.get(/^.*sndcdn.*$/, toolbox.cacheFirst)

if (swConfig.debug) {
  toolbox.options.debug = true
}

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})
