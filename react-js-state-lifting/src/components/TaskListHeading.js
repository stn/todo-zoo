import React from 'react';

function TaskListHeading({ taskList }) {
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <h2 id="list-heading" tabIndex="-1">
      {headingText}
    </h2>
  );
}

export default TaskListHeading;
