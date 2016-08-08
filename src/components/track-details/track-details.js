/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'
import TrackDuration from '../track-duration/track-duration'
import css from './track-details.style'

export default ({title, user, duration}) =>
  <div
    className={css(css.trackDetailContainer, 'rowSpaceBetween', 'alignCenter')}>
    <div className={css.trackDetail}>
      <div className={css.title}>{title}</div>
      <div className={css.artist}>{user.username}</div>
    </div>
    {TrackDuration(duration)}
  </div>
