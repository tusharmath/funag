/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

export default function (animation) {
  animation.finished = new Promise(function (resolve, reject) {
    function onFinish (ev) {
      resolve(ev)
      animation.removeEventListener('finish', onFinish)
    }

    animation.addEventListener('finish', onFinish)
  })
  return animation
}
