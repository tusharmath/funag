/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {mux} from 'muxer'
import {ScrobberUIModel} from './scrobber.ui-model'
import css from './scrobber.style'

const view = ({completion$, ui}) => completion$
  .throttle(1000)
  .startWith(0)
  .map(completion =>
    <div classNames={[css.scrobber, 'scrobber']} key='scrobber'
         hook-insert={ui.onInsert.bind(ui)}
         hook-update={ui.onUpdate.bind(ui)}
         attrs-completion={completion}>
      <div hook-insert={ui.onTrackInsert.bind(ui)}
           className={css(css.scrobberTrack, 'flb row jc_fe draggable-marker')}>
        <div className={css.scrobberIcon}
             on-touchStart={ui.onTouchStart.bind(ui)}
             on-touchstart={ui.onTouchStart.bind(ui)}
             on-touchmove={ui.onTouchMove.bind(ui)}
             on-touchend={ui.onTouchEnd.bind(ui)}
        />
      </div>
    </div>
  )

export default ({completion$, DOM}) => {
  const ui = new ScrobberUIModel()
  const seek$ = DOM
    .select('.scrobber')
    .events('changeEnd')
    .pluck('detail', 'completion')
  const vTree$ = view({completion$, ui})
  const audio$ = mux({seek: seek$})
  return {
    DOM: vTree$, audio$
  }
}
