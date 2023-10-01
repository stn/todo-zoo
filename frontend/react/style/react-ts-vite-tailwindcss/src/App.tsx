import React from "react"

import Form from "./features/tasks/Form"
import TaskList from "./features/tasks/TaskList"

function App() {
  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl">TodoMatic</h1>
      <Form />
      <TaskList />
    </div>
  )
}

export default App
