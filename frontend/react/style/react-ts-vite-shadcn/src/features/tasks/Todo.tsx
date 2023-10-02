import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDispatch } from "react-redux"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

import { usePrevious } from "@/app/hooks"
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
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>
            <label htmlFor={id} className="hidden">
              New name for {name}
            </label>
            <Input
              id={id}
              className="w-full"
              value={newName}
              onChange={handleChange}
              ref={editFieldRef}
            />
          </CardTitle>
        </CardHeader>
        <CardFooter className="space-x-2">
          <Button onClick={() => setEditing(false)}>
            Cancel
            <span className="hidden">renaming {name}</span>
          </Button>
          <Button type="submit">
            Save
            <span className="hidden">new name for {name}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )

  const viewTemplate = (
    <Card>
      <CardHeader>
        <CardTitle className="space-x-2">
          <Checkbox
            id={id}
            defaultChecked={completed}
            onChange={() => dispatch(toggleTaskCompleted(id))}
          />
          <label htmlFor={id}>{name}</label>
        </CardTitle>
      </CardHeader>
      <CardFooter className="space-x-2">
        <Button onClick={() => setEditing(true)} ref={editButtonRef}>
          Edit <span className="hidden">{name}</span>
        </Button>
        <Button onClick={() => dispatch(deleteTask(id))}>
          Delete <span className="hidden">{name}</span>
        </Button>
      </CardFooter>
    </Card>
  )

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>
}
