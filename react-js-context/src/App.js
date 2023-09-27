import React from 'react';

import Form from './components/Form';
import TaskList from './components/TaskList';
import {TasksProvider} from './TasksContext';

function App(props) {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <TasksProvider initialTasks={props.tasks}>
        <Form />
        <TaskList />
      </TasksProvider>
    </div>
  );
}

export default App;
