/**
 * Created by imamudin.naseem on 19/05/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as F from '../utils/Flexbox'
import * as S from '../utils/SoundCloud'

const view = ({timeupdate$}) => timeupdate$
  .throttle(1000)
  .map(x =>
  div({
    style: {
      ...F.RowSpaceBetween,
      padding: '5px',
      fontSize: '0.5em',
      fontWeight: '100'
    }
  }, [div(S.durationFormat(x.currentTime, 'sec')), div(S.durationFormat(x.duration, 'sec'))])
)

export default ({timeupdate$}) => {
  return {
    DOM: view({timeupdate$})
  }
}

