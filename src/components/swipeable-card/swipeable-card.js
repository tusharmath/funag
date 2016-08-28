/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import view from './swipeable-card.view'
import model from './swipeable-card.model'

export default (sources) => {
  return {DOM: view(model(sources))}
}
