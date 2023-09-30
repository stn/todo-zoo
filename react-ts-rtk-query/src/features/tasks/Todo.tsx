import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"

import { usePrevious } from "../../app/hooks"
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../app/services/task"

interface TodoProps {
  id: string
  name: string
  completed: boolean
}

export default function Todo({ id, name, completed }: TodoProps) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const wasEditing = usePrevious(isEditing)

  const editFieldRef = useRef<HTMLInputElement>(null)
  const editButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus()
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus()
    }
  }, [wasEditing, isEditing])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await updateTask({
        id,
        name: newName,
        completed,
      }).unwrap()
      setNewName("")
      setEditing(false)
    } catch {
      console.log("An error occurred.")
    }
  }

  async function handleToggleCompleted() {
    try {
      await updateTask({
        id,
        name,
        completed: !completed,
      }).unwrap()
    } catch {
      console.log("An error occurred.")
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(id).unwrap()
    } catch {
      console.log("An error occurred.")
    }
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={handleToggleCompleted}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={handleDelete}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  )

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}
