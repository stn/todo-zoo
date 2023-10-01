import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  name: string
  completed: boolean
}

export type TasksState = Task[]

const initialState: TasksState = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
]

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.push({
        id: `todo-${nanoid()}`,
        name: action.payload,
        completed: false,
      })
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload)
      if (index !== -1) {
        state[index].completed = !state[index].completed
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state[index].name = action.payload.name
      }
    },
  },
})

export const { addTask, toggleTaskCompleted, deleteTask, editTask } =
  tasksSlice.actions

export default tasksSlice.reducer
