import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDispatch } from "react-redux"

import { usePrevious } from "../../app/hooks"
import { editTask, deleteTask, toggleTaskCompleted } from "./tasksSlice"

interface TodoProps {
  id: string
  name: string
  completed: boolean
}

export default function Todo({ id, name, completed }: TodoProps) {
  const dispatch = useDispatch()

  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState("")

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch(
      editTask({
        id,
        name: newName,
      }),
    )
    setNewName("")
    setEditing(false)
  }

  const editingTemplate = (
    <form className="card-body" onSubmit={handleSubmit}>
      <div className="card-title">
        <label htmlFor={id} className="hidden">
          New name for {name}
        </label>
        <input
          id={id}
          className="input input-bordered w-full"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="card-actions justify-end">
        <button
          type="button"
          className="badge badge-outline"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="hidden">renaming {name}</span>
        </button>
        <button type="submit" className="badge badge-outline">
          Save
          <span className="hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="card-body">
      <div className="card-title">
        <input
          id={id}
          type="checkbox"
          className="checkbox"
          defaultChecked={completed}
          onChange={() => dispatch(toggleTaskCompleted(id))}
        />
        <label htmlFor={id}>{name}</label>
      </div>
      <div className="card-actions justify-end">
        <button
          type="button"
          className="badge badge-outline"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="hidden">{name}</span>
        </button>
        <button
          type="button"
          className="badge badge-outline"
          onClick={() => dispatch(deleteTask(id))}
        >
          Delete <span className="hidden">{name}</span>
        </button>
      </div>
    </div>
  )

  return (
    <li className="card card-compact card-bordered">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}
