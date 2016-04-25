/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import toolbox from 'sw-toolbox'

toolbox.router.get('/', toolbox.cacheFirst)
toolbox.router.get(/.*bundle.*/, toolbox.cacheFirst)
toolbox.router.get(/.*googleapis.*/, toolbox.cacheFirst)
toolbox.router.get(/.*gstatic.*/, toolbox.cacheFirst)
toolbox.router.get(/.*bootstrapcdn.*/, toolbox.cacheFirst)
toolbox.router.default = toolbox.cacheFirst
