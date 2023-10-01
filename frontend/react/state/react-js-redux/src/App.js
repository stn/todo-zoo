import React from 'react';
import {Provider} from 'react-redux';

import Form from './components/Form';
import TaskList from './components/TaskList';
import {store} from './store'

function App(props) {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Provider store={store}>
        <Form />
        <TaskList />
      </Provider>
    </div>
  );
}

export default App;
