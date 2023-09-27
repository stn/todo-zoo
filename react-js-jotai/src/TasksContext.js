import React, {createContext, useContext, useState} from "react";
import {nanoid} from "nanoid";

export const TasksContext = createContext(null);

// actions
export const AddTaskContext = createContext(null);
export const ToggleTaskCompletedContext = createContext(null);
export const DeleteTaskContext = createContext(null);
export const EditTaskContext = createContext(null);

export function TasksProvider({ initialTasks, children }) {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
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

