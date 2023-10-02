import React from "react"

import Form from "./features/tasks/Form"
import TaskList from "./features/tasks/TaskList"

function App() {
  return (
    <div className="container p-10 w-[600px]">
      <h1 className="text-4xl">TodoMatic</h1>
      <Form />
      <TaskList />
    </div>
  )
}

export default App
