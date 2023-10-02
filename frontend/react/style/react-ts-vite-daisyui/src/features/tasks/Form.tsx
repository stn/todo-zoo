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
    <form onSubmit={handleSubmit} className="form-control w-full">
      <label htmlFor="new-todo-input" className="label">
        <span className="label-text">What needs to be done?</span>
      </label>
      <div className="input-group">
        <input
          className="input input-bordered w-full"
          type="text"
          id="new-todo-input"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </div>
    </form>
  )
}

export default Form
