import React, { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      <div className="flex w-full space-x-2">
        <Input
          id="new-todo-input"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

export default Form
