/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

export const FlexRow = {display: 'flex', 'flex-direction': 'row'}
export const FlexCol = {display: 'flex', 'flex-direction': 'column'}
export const RowSpaceBetween = {...FlexRow, 'justify-content': 'space-between'}
export const RowSpaceAround = {...FlexRow, 'justify-content': 'space-around'}
export const ColSpaceAround = {...FlexCol, 'justify-content': 'space-around'}
export const ColSpaceBetween = {...FlexCol, 'justify-content': 'space-between'}
export const ColCenter = {...FlexCol, 'justify-content': 'center'}
export const RowCenter = {...FlexRow, 'justify-content': 'center'}
export const ColMiddle = {...ColCenter, 'align-items': 'center'}
export const RowMiddle = {...RowCenter, 'align-items': 'center'}
export const RowLeft = {...FlexRow, 'justify-content': 'flex-start'}
export const RowRight = {...FlexRow, 'justify-content': 'flex-end'}
export const RowWrap = {...FlexRow, flexWrap: 'wrap'}
export const ColWrap = {...FlexCol, flexWrap: 'wrap'}
