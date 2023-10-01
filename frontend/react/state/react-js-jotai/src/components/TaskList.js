import React, {useEffect, useRef, useState} from 'react';
import {atom, useAtomValue} from 'jotai';

import {taskAtomsAtom} from '../tasks';
import {usePrevious} from '../hooks';

import FilterButton from './FilterButton';
import TaskListHeading from './TaskListHeading';
import Todo from './Todo';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function createFilteredAtom(filter) {
  return atom((get) =>
    get(taskAtomsAtom)
      .filter((taskAtom) => FILTER_MAP[filter](get(taskAtom)))
      .map((taskAtom) => [get(taskAtom).id, taskAtom])
  );
}

const FILTERED_MAP =
  Object.fromEntries(
    FILTER_NAMES.map((filter) => [filter, createFilteredAtom(filter)])
  )

function TaskList(props) {
  const [filter, setFilter] = useState('All');
  const filteredAtoms = useAtomValue(FILTERED_MAP[filter])

  const taskList = filteredAtoms
    .map(([id, taskAtom]) => {
      return (
        <Todo
          task={taskAtom}
          key={id}
        />
      );
    });

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(filteredAtoms.length);

  useEffect(() => {
    if (filteredAtoms.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [filteredAtoms.length, prevTaskLength]);

  return (
    <div>
      <div className="filters btn-group stack-exception">{filterList}</div>
      <div tabIndex="-1" ref={listHeadingRef}>
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
