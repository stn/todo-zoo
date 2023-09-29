import {create} from 'zustand';
import {nanoid} from 'nanoid';

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false },
];

export const useTasksStore = create((set) => ({
  tasks: DATA,
  addTask: (name) => set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: `todo-${nanoid()}`,
          name,
          completed: false
        }
      ],
    })
  ),
  toggleTaskCompleted: (id) => set((state) => ({
      tasks: state.tasks.map((task) => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // use object spread to make a new object
          // whose `completed` prop has been inverted
          return {...task, completed: !task.completed};
        }
        return task;
      }),
    })
  ),
  deleteTask: (id) => set((state) => ({
      tasks: state.tasks.filter((task) => id !== task.id),
    })
  ),
  editTask: (id, name) => set((state) => ({
      tasks: state.tasks.map((task) => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          return {...task, name};
        }
        return task;
      }),
    })
  ),
}));
