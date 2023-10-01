import React from 'react';

import Form from './components/Form';
import TaskList from './components/TaskList';

function App(props) {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <TaskList />
    </div>
  );
}

export default App;
