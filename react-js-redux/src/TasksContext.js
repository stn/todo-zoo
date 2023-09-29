import {createContext, useContext, useReducer} from 'react';
import {nanoid} from 'nanoid';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add_task': {
      return [
        ...tasks,
        {
          id: `todo-${nanoid()}`,
          name,
          completed: false,
        },
      ];
    }
    case 'toggle_task_completed': {
      return tasks.map((task) => {
        // if this task has the same ID as the edited task
        if (action.id === task.id) {
          // use object spread to make a new object
          // whose `completed` prop has been inverted
          return {...task, completed: !task.completed};
        }
        return task;
      });
    }
    case 'delete_task': {
      return tasks.filter((task) => action.id !== task.id);
    }
    case 'edit_task': {
      return tasks.map((task) => {
        // if this task has the same ID as the edited task
        if (action.id === task.id) {
          //
          return {...task, name: action.name};
        }
        return task;
      });
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export function TasksProvider({ initialTasks, children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
