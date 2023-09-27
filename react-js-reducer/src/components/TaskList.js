import React, {useEffect, useRef, useState} from 'react';

import FilterButton from "./FilterButton";
import TaskListHeading from "./TaskListHeading";
import Todo from "./Todo";

import {usePrevious} from "../hooks";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function TaskList(props) {
  const [filter, setFilter] = useState('All');

  const taskList = props.tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={props.toggleTaskCompleted}
        deleteTask={props.deleteTask}
        editTask={props.editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(props.tasks.length);

  useEffect(() => {
    if (props.tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [props.tasks.length, prevTaskLength]);

  return (
    <div>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <div ref={listHeadingRef}>
        <TaskListHeading taskList={taskList} />
      </div>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default TaskList;
