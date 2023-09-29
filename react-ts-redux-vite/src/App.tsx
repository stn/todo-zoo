import React from "react"

import Form from "./features/tasks/Form"
import TaskList from "./features/tasks/TaskList"

function App() {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <TaskList />
    </div>
  )
}

export default App
