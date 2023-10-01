import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

const root = createRoot(document.getElementById('app'));

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false },
];

root.render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>
);
