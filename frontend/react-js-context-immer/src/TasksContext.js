import React, {createContext, useContext} from 'react';

import {useImmer} from 'use-immer'
import {nanoid} from 'nanoid';

export const TasksContext = createContext(null);

// actions
export const AddTaskContext = createContext(null);
export const ToggleTaskCompletedContext = createContext(null);
export const DeleteTaskContext = createContext(null);
export const EditTaskContext = createContext(null);

export function TasksProvider({ initialTasks, children }) {
  const [tasks, setTasks] = useImmer(initialTasks);

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks((draft) => {
      draft.push(newTask)
    });
  }

  function toggleTaskCompleted(id) {
    setTasks((draft) => {
      const task = draft.find((task) => task.id === id);
      task.completed = !task.completed;
    });
  }

  function deleteTask(id) {
    setTasks((draft) => {
      const index = draft.findIndex(task => task.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }

  function editTask(id, newName) {
    setTasks((draft) => {
      const index = draft.findIndex(task => task.id === id);
      if (index !== -1) {
        draft[index].name = newName;
      }
    });
  }

  return (
    <TasksContext.Provider value={tasks}>
      <AddTaskContext.Provider value={addTask}>
        <ToggleTaskCompletedContext.Provider value={toggleTaskCompleted}>
          <DeleteTaskContext.Provider value={deleteTask}>
            <EditTaskContext.Provider value={editTask}>
              {children}
            </EditTaskContext.Provider>
          </DeleteTaskContext.Provider>
        </ToggleTaskCompletedContext.Provider>
      </AddTaskContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useAddTask() {
  return useContext(AddTaskContext);
}

export function useToggleTaskCompleted() {
  return useContext(ToggleTaskCompletedContext);
}

export function useDeleteTask() {
  return useContext(DeleteTaskContext);
}

export function useEditTask() {
  return useContext(EditTaskContext);
}
