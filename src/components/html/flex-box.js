/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {createGlobal} from '../../lib/CreateStyle'

export const flexRow = {display: 'flex', flexDirection: 'row'}
export const flexCol = {display: 'flex', flexDirection: 'column'}
export const rowSpaceBetween = {...flexRow, justifyContent: 'space-between'}
export const rowSpaceAround = {...flexRow, justifyContent: 'space-around'}
export const colSpaceAround = {...flexCol, justifyContent: 'space-around'}
export const colSpaceBetween = {...flexCol, justifyContent: 'space-between'}
export const colCenter = {...flexCol, justifyContent: 'center'}
export const rowCenter = {...flexRow, justifyContent: 'center'}
export const colMiddle = {...colCenter, alignItems: 'center'}
export const rowMiddle = {...rowCenter, alignItems: 'center'}
export const rowLeft = {...flexRow, justifyContent: 'flex-start'}
export const rowRight = {...flexRow, justifyContent: 'flex-end'}
export const rowWrap = {...flexRow, flexWrap: 'wrap'}
export const colWrap = {...flexCol, flexWrap: 'wrap'}
export const flexSpread = {flex: '1 0 0'}
export const alignCenter = {alignItems: 'center'}

createGlobal({
  '.flexRow': flexRow,
  '.flexCol': flexCol,
  '.rowSpaceBetween': rowSpaceBetween,
  '.rowSpaceAround': rowSpaceAround,
  '.colSpaceAround': colSpaceAround,
  '.colSpaceBetween': colSpaceBetween,
  '.colCenter': colCenter,
  '.rowCenter': rowCenter,
  '.colMiddle': colMiddle,
  '.rowMiddle': rowMiddle,
  '.rowLeft': rowLeft,
  '.rowRight': rowRight,
  '.rowWrap': rowWrap,
  '.colWrap': colWrap,
  '.flexSpread': flexSpread,
  '.alignCenter': alignCenter
})
