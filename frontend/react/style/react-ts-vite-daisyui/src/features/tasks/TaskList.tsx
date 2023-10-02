import React, { useEffect, useRef, useState } from "react"

import { useAppSelector, usePrevious } from "../../app/hooks"

import FilterButton from "./FilterButton"
import TaskListHeading from "./TaskListHeading"
import Todo from "./Todo"
import { Task } from "./tasksSlice"

const FILTER_MAP: Record<string, (task: Task) => boolean> = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function TaskList() {
  const tasks = useAppSelector((state) => state.tasks)
  const [filter, setFilter] = useState("All")

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    ))

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const listHeadingRef = useRef<HTMLDivElement>(null)
  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (prevTaskLength && tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus()
    }
  }, [tasks.length, prevTaskLength])

  return (
    <div className="container my-4 space-y-4">
      <div className="tabs tabs-boxed justify-evenly">{filterList}</div>
      <div tabIndex={-1} ref={listHeadingRef}>
        <TaskListHeading taskList={taskList} />
      </div>
      <ul aria-labelledby="list-heading" className="space-y-4">
        {taskList}
      </ul>
    </div>
  )
}

export default TaskList
