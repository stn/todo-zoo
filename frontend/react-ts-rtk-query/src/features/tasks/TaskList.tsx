import React, { useEffect, useRef, useState } from "react"

import { usePrevious } from "../../app/hooks"

import FilterButton from "./FilterButton"
import TaskListHeading from "./TaskListheading"
import Todo from "./Todo"
import { Task, useGetTasksQuery } from "../../app/services/task"

const FILTER_MAP: Record<string, (task: Task) => boolean> = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const EMPTY_TASKS: Task[] = []

function TaskList() {
  const { tasks, isError, isLoading } = useGetTasksQuery(undefined, {
    selectFromResult: ({ data, ...results }) => ({
      tasks: data ?? EMPTY_TASKS,
      ...results,
    }),
  })
  const [filter, setFilter] = useState("All")

  const listHeadingRef = useRef<HTMLDivElement>(null)
  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (prevTaskLength && tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus()
    }
  }, [tasks, prevTaskLength])

  if (isError) {
    return <div>Something wrong</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

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

  return (
    <div>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <div tabIndex={-1} ref={listHeadingRef}>
        <TaskListHeading taskList={taskList} />
      </div>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default TaskList
