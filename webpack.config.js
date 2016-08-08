/**
 * Created by tushar.mathur on 13/04/16.
 */
'use strict'

// NOTE: deployment fails if env is not setup — https://travis-ci.org/funag/ui-core#L393
require('./src/lib/env')
module.exports = require('./src/lib/WebpackConfig.env').default
