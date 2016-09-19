/**
 * Created by tushar.mathur on 18/09/16.
 */

'use strict'

/* global requestAnimationFrame */

let canSchedule = false
const tasks = []
const executeTasks = () => {
  for (var i = 0; i < tasks.length; i++) tasks[i]()
}
const schedule = () => {
  executeTasks()
  if (canSchedule && tasks.length > 0) {
    requestAnimationFrame(schedule)
  }
}

export const start = (cb) => {
  canSchedule = true
  tasks.push(cb)
  schedule()
  return tasks.length - 1
}

export const stop = (id) => {
  tasks.splice(id, 1)
  if (tasks.length === 0) canSchedule = false
}

export default {start, stop}
