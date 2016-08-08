/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {createGlobal} from '../../lib/CreateStyle'

export default createGlobal({
  '.flexRow': {display: 'flex', flexDirection: 'row'},
  '.flexCol': {display: 'flex', flexDirection: 'column'},
  '.rowSpaceBetween': {extend: '.flexRow', justifyContent: 'space-between'},
  '.rowSpaceAround': {extend: '.flexRow', justifyContent: 'space-around'},
  '.colSpaceAround': {extend: '.flexCol', justifyContent: 'space-around'},
  '.colSpaceBetween': {extend: '.flexCol', justifyContent: 'space-between'},
  '.colCenter': {extend: '.flexCol', justifyContent: 'center'},
  '.rowCenter': {extend: '.flexRow', justifyContent: 'center'},
  '.colMiddle': {extend: '.colCenter', alignItems: 'center'},
  '.rowMiddle': {extend: '.rowCenter', alignItems: 'center'},
  '.rowLeft': {extend: '.flexRow', justifyContent: 'flex-start'},
  '.rowRight': {extend: '.flexRow', justifyContent: 'flex-end'},
  '.rowWrap': {extend: '.flexRow', flexWrap: 'wrap'},
  '.colWrap': {extend: '.flexCol', flexWrap: 'wrap'},
  '.flexSpread': {flex: '1 0 0'}
})
