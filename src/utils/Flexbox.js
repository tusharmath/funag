/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

export const FlexRow = {display: 'flex', flexDirection: 'row'}
export const FlexCol = {display: 'flex', flexDirection: 'column'}
export const RowSpaceBetween = {...FlexRow, justifyContent: 'space-between'}
export const RowSpaceAround = {...FlexRow, justifyContent: 'space-around'}
export const ColSpaceAround = {...FlexCol, justifyContent: 'space-around'}
export const ColSpaceBetween = {...FlexCol, justifyContent: 'space-between'}
export const ColCenter = {...FlexCol, justifyContent: 'center'}
export const RowCenter = {...FlexRow, justifyContent: 'center'}
export const ColMiddle = {...ColCenter, alignItems: 'center'}
export const RowMiddle = {...RowCenter, alignItems: 'center'}
export const RowLeft = {...FlexRow, justifyContent: 'flex-start'}
export const RowRight = {...FlexRow, justifyContent: 'flex-end'}
export const RowWrap = {...FlexRow, flexWrap: 'wrap'}
export const ColWrap = {...FlexCol, flexWrap: 'wrap'}
