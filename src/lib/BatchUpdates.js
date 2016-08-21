/**
 * Created by tushar.mathur on 21/08/16.
 */

'use strict'

import raf from 'raf'

let tasks = []
let isScheduled = false
let frame

export const executeTasks = () => {
  let task = tasks.shift()
  while (task) {
    task()
    task = tasks.shift()
  }
  isScheduled = false
}

export const scheduleExecution = () => {
  if (isScheduled === false) {
    frame = raf(executeTasks)
    isScheduled = true
  }
}

export const mutate = cb => {
  tasks.push(cb)
  scheduleExecution()
  return tasks.length - 1
}

export const destroy = () => {
  raf.cancel(frame)
  tasks = []
  isScheduled = false
}

export const remove = id => {
  tasks.splice(id, 1)
}

export const mutateLatest = () => {
  let id = null
  return cb => {
    if (id !== null) remove(id)
    id = mutate(cb)
  }
}
