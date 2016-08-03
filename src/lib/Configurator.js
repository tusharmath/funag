/**
 * Created by tushar.mathur on 03/08/16.
 */

'use strict'
import R from 'ramda'

export default (config) => {
  const ofPath = R.path(R.__, config)
  const _appendToPath = R.useWith(R.over, [R.lensPath, R.append])
  const _plugin = _appendToPath(['plugins'])
  const _loader = _appendToPath(['module', 'loaders'])
  const _if = R.uncurryN(3, condition => R.ifElse(R.always(condition), R.__, R.identity))
  const _copyFrom = R.useWith(R.set, [R.lensPath, ofPath, R.identity])
  const _set = R.useWith(R.set, [R.lensPath, R.identity, R.identity])
  const _true = R.compose(R.equals(true), ofPath)
  const _preset = _appendToPath(['presets'])
  const _ok = (path, val) => _if(_true(path), val)
  const _copy = x => _copyFrom(x, x)
  return {
    plugin: _plugin,
    copyFrom: _copyFrom,
    copy: _copy,
    set: _set,
    loader: _loader,
    preset: _preset,
    true: _true,
    if: _if,
    ok: _ok
  }
}
