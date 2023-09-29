import React, { ReactElement } from "react"

interface TaskListHeadingProps {
  taskList: ReactElement[]
}

function TaskListHeading({ taskList }: TaskListHeadingProps) {
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task"
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return <h2 id="list-heading">{headingText}</h2>
}

export default TaskListHeading
