/**
 * Created by imamudin.naseem on 25/08/16.
 */

import css from './header.style'

export default ({searchBox}) =>
  searchBox.DOM.map(searchBox =>
    <div className={css(css.headerContainer)}>
      <div className={css('flb col jc_c spread', css.headerText)}>
        <div>
          <strong>Funag</strong>
        </div>
        <small>Unofficial soundcloud player</small>
      </div>
      {searchBox}
    </div>
  )
