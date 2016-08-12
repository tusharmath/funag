/**
 * Created by tushar.mathur on 12/08/16.
 */

'use strict'

import {Component} from 'react'
import {Subject} from 'rx'
import R from 'ramda'

export class SmartComponent extends Component {
  constructor () {
    super()
    const __subject = this.__subject = new Subject()
    this.fromCB = R.curry((name, value) => __subject.onNext([name, value]))
    this.select = name => __subject.filter(x => x[0] === name).map(R.nth(1))
  }

  componentWillMount () {
    if (this.init) {
      const EVENTS = R.pickAll(['select'], this)
      const {state$, intent$} = this.init.call(null, {EVENTS})
      this.__disposable = state$.subscribe(state => this.setState(state))
      if (this.props.onIntent && intent$) {
        this.props.onIntent(intent$)
      }
    }
    this.fromCB('@willMount', this)
  }

  componentDidMount (...t) {
    this.fromCB('@didMount', t)
  }

  componentWillReceiveProps (...t) {
    this.fromCB('@willReceiveProps', t)
  }

  componentWillUpdate (...t) {
    this.fromCB('@willUpdate', t)
  }

  componentDidUpdate (...t) {
    this.fromCB('@didUpdate', t)
  }

  componentWillUnMount (...t) {
    this.fromCB('@unmount', t)
    if (this.__subject) this.__subject.onCompleted()
    if (this.__disposable) this.__disposable.dispose()
  }
}
