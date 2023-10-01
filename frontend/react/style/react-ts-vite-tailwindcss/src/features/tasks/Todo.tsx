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
    <form className="" onSubmit={handleSubmit}>
      <div className="p-2">
        <label htmlFor={id} className="hidden">
          New name for {name}
        </label>
        <input
          id={id}
          className="border rounded shadow grow w-auto"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="p-1 mx-1 border rounded"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="hidden">renaming {name}</span>
        </button>
        <button type="submit" className="p-1 mx-1 border rounded">
          Save
          <span className="hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="stack-small">
      <div className="py-1 m-2">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => dispatch(toggleTaskCompleted(id))}
        />
        <label className="p-2 m-2" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="p-1 mx-1 border rounded"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="hidden">{name}</span>
        </button>
        <button
          type="button"
          className="p-1 mx-1 border rounded"
          onClick={() => dispatch(deleteTask(id))}
        >
          Delete <span className="hidden">{name}</span>
        </button>
      </div>
    </div>
  )

  return (
    <li className="py-2 m-2 border shadow">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}
