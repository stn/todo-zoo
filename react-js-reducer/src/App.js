import React, {useReducer} from 'react';

import Form from './components/Form';
import TaskList from './components/TaskList';
import tasksReducer from './reducers/tasks_reducer';

function App(props) {
  const [tasks, dispatch] = useReducer(tasksReducer, props.tasks);

  function addTask(name) {
    dispatch({
      type: 'add_task',
      name: name,
    });
  }

  function toggleTaskCompleted(id) {
    dispatch({
      type: 'toggle_task_completed',
      id: id,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: 'delete_task',
      id: id,
    });
  }

  function editTask(id, newName) {
    dispatch({
      type: 'edit_task',
      id: id,
      name: newName,
    });
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <TaskList
        tasks={tasks}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
