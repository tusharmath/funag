/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import {div} from '@cycle/dom'

export default artwork_url => artwork_url ? div({
  style: {
    WebkitFilter: 'blur(2px)',
    backgroundImage: `url(${artwork_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundSize: '100%',
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  }
}) : null
