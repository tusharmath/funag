/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import css from './header.style'
import IconButton from '../fa-icon-button/fa-icon-button'
import Tab from '../tab/tab'

const view = ({ROUTER, tab}) => tab
  .DOM.map(tab =>
    <div className={css(css.headerContainer, 'fade-in')}>
      <div className={css('rowMiddle')}>
        <div className={css('flexSpread', css.headerText)}>
          <div>
            <strong>Funag</strong>
          </div>
          <small>Unofficial soundcloud player</small>
        </div>
        <div className={css('flexSpread')}>
          <div className={css('rowRight')}>
            {IconButton('Search', ROUTER.createHref('/search'))}
            {IconButton('ellipsis-v', ROUTER.createHref('/search'))}
          </div>
        </div>
      </div>
      <div>{tab}</div>
    </div>
  )

export default ({DOM, ROUTER}) => {
  const nav = ['HISTORY', 'BOOKMARKED']
  const sections = ['HISTORY CONTENT', 'BOOKMARKED CONTENT']
  const tab = Tab({DOM, nav, sections})
  tab.selectedTab$.subscribe(x => console.log('NAV', x))
  return {
    DOM: view({ROUTER, tab})
  }
}
