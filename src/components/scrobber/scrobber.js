/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import R from 'ramda'
import MinMaxValue from '../../lib/MinMaxValue'
import {rxRAFThrottle} from 'rx-raf-throttle'
import RootDimensions from '../../lib/RootDimensions'
import css from './scrobber.style'

const getClientX = R.compose(R.prop('clientX'), R.nth(0), R.prop('changedTouches'))
const style = ({completion, transition}) => ({
  transform: `translateX(${100 * completion - 100}%)`,
  transition: transition ? 'transform 100ms linear' : null
})
const view = ({completion$}) => completion$
  .map(({completion, transition}) =>
    <div className={css(css.scrobber, 'scrobber')}>
      <div className={css(css.scrobberTrack, 'rowRight', 'draggable-marker')}
           style={style({completion, transition})}>
        <div className={css.scrobberIcon}/>
      </div>
    </div>
  )
const controlledSeek = ({touchMove$, maxWidth$, minWidth$}) => {
  const clientX$ = touchMove$.map(getClientX)
  const seek$ = MinMaxValue(minWidth$, maxWidth$, clientX$).withLatestFrom(maxWidth$, R.divide)
  return rxRAFThrottle(seek$)
}
const setTransition = transition => R.compose(R.merge({transition}), R.objOf('completion'))
export default ({completion$, DOM, QUICK}) => {
  const maxWidth$ = RootDimensions(DOM).pluck('width')
  const minWidth$ = O.just(0)
  const scrobberEL = DOM.select('.scrobber')

  const touchMove$ = scrobberEL.events('touchmove')
  const touchStart$ = scrobberEL.events('touchstart')

  const seek$ = controlledSeek({
    touchMove$,
    maxWidth$,
    minWidth$
  })

  const seekD$ = seek$.debounce(300)

  const vTree$ = view({
    completion$: seekD$.startWith(null).flatMapLatest(() =>
      completion$
        .map(setTransition(true))
        .throttle(1000)
        .takeUntil(touchStart$)
    ).startWith({transition: true, completion: 0})
  })

  const quick$ = QUICK.UpdateStyle.of(
    DOM.select('.draggable-marker').elements().map(R.head),
    seek$.map(R.compose(style, setTransition(false)))
  )

  const audio$ = mux({seek: seekD$})

  return {
    DOM: vTree$, audio$, QUICK: quick$
  }
}
