import React from 'react';
import {Provider} from 'jotai';

import Form from './components/Form';
import TaskList from './components/TaskList';

function App(props) {
  return (
    <Provider>
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
