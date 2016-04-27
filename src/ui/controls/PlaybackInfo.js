/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div, i} from '@cycle/dom'
import * as F from '../../utils/Flexbox'

export default ({selectedTrack$}) => {
  const init = {
    title: ' ',
    user: {username: ' '},
    genre: ' '
  }
  return {
    DOM: selectedTrack$.startWith(init).map(track =>
      div({style: F.RowSpaceBetween}, [
        div({style: {textTransform: 'capitalize', fontSize: '0.8em', fontWeight: 600}}, [
          div({style: {}}, [track.title]),
          div({style: {fontSize: '0.8em', color: '#555'}}, [
            track.user.username,
            ' - ',
            track.genre
          ])
        ])
      ])
    ).startWith(null)
  }
}
