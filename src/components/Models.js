'use strict'

// TODO: Move to Playlist component
export const Audio = ({url$}) => url$
  .scan((last, src) => {
    if (!last || last.src !== src) return {type: 'LOAD', src}
    if (last.type === 'PAUSE') return {type: 'PLAY', src}
    return {type: 'PAUSE', src}
  }, null)
