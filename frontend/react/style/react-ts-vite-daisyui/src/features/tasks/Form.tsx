import React, { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"

import { addTask } from "./tasksSlice"

function Form() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (name === "") {
      return
    }
    dispatch(addTask(name))
    setName("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 my-2">
      <h2 className="mb-2">
        <label htmlFor="new-todo-input" className="text-lg">
          What needs to be done?
        </label>
      </h2>
      <div className="flex">
        <input
          type="text"
          id="new-todo-input"
          className="grow shadow border w-auto py-2 px-3 mr-4"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="p-2 border-2 rounded ">
          Add
        </button>
      </div>
    </form>
  )
}

export default Form
