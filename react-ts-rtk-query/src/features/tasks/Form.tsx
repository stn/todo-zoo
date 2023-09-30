import React, { ChangeEvent, FormEvent, useState } from "react"

import { useAddTaskMutation } from "../../app/services/task"

function Form() {
  const [name, setName] = useState("")
  const [addTask] = useAddTaskMutation()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (name === "") {
      return
    }
    try {
      await addTask(name).unwrap()
      setName("")
    } catch {
      throw new Error("An error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  )
}

export default Form
