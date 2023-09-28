import React, {useEffect, useMemo, useRef, useState} from 'react';
import {atom, useAtom, useAtomValue} from 'jotai';

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

function TaskList(props) {
  const [taskAtoms, dispatch] = useAtom(taskAtomsAtom);

  const [filter, setFilter] = useState('All');
  const filteredAtoms = useAtomValue(useMemo(() => atom(
    (get) => {
      return taskAtoms.filter((taskAtom) => FILTER_MAP[filter](get(taskAtom)));
    }),
    [taskAtoms, filter]
  ));
  const ids = useAtomValue(useMemo(() => atom(
    (get) => {
      return filteredAtoms.map((a) => get(a).id);
    }
  ), [filteredAtoms]));

  const taskList = filteredAtoms
    .map((taskAtom, i) => {
      return (
        <Todo
          task={taskAtom}
          remove={() => dispatch({
            type: 'remove',
            atom: taskAtom,
          })}
          key={ids[i]}
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
