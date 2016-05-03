/**
 * Created by tushar.mathur on 03/05/16.
 */

'use strict'

export const documentTitleDriver = title$ => {
  title$.subscribe(title => {
    document.title = title
  })
}
