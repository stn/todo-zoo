import {createSlice, nanoid} from '@reduxjs/toolkit';


const initialState = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: `todo-${nanoid()}`,
        name: action.payload,
        completed: false,
      })
    },
    toggleTaskCompleted: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state[index].completed = !state[index].completed;
      }
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    editTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index].name = action.payload.name;
      }
    },
  },
});

export const {
  addTask,
  toggleTaskCompleted,
  deleteTask,
  editTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
