import React, {useState} from 'react';
import {nanoid} from 'nanoid';

import Form from './components/Form';
import TaskList from './components/TaskList';
import {AddTaskContext, DeleteTaskContext, EditTaskContext, TasksContext, ToggleTaskCompletedContext} from "./TasksContext";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

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
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <TasksContext.Provider value={tasks}>
        <AddTaskContext.Provider value={addTask}>
          <ToggleTaskCompletedContext.Provider value={toggleTaskCompleted}>
            <DeleteTaskContext.Provider value={deleteTask}>
              <EditTaskContext.Provider value={editTask}>
                <Form />
                <TaskList />
              </EditTaskContext.Provider>
            </DeleteTaskContext.Provider>
          </ToggleTaskCompletedContext.Provider>
        </AddTaskContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
