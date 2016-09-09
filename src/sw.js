/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import toolbox from 'sw-toolbox'

const swConfig = APP_CONFIG.sw

toolbox.router.get('/', toolbox.fastest)
toolbox.router.get(/.*client.*/, toolbox.fastest)

toolbox.router.get(/^.*googleapis.*$/, toolbox.fastest)
toolbox.router.get(/^.*gstatic.*$/, toolbox.fastest)
toolbox.router.get(/^.*bootstrapcdn.*$/, toolbox.fastest)
toolbox.router.get(/^.*snd\.cdn.*$/, toolbox.fastest)

if (swConfig.debug) {
  toolbox.options.debug = true
}
