import React, {useEffect, useRef, useState} from 'react';
import {useAtom} from 'jotai';

import {usePrevious} from '../hooks';

export default function Todo(props) {
  const [task, setTask] = useAtom(props.task)

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const wasEditing = usePrevious(isEditing);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask((prev) => ({...prev, name: newName}));
    setNewName('');
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={task.id}>
          New name for {task.name}
        </label>
        <input
          id={task.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {task.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {task.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={task.id}
          type="checkbox"
          defaultChecked={task.completed}
          onChange={() => {
            setTask((prev) => ({...prev, completed: !prev.completed}));
          }}
        />
        <label className="todo-label" htmlFor={task.id}>
          {task.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{task.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.remove(props.task)}
        >
          Delete <span className="visually-hidden">{task.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
