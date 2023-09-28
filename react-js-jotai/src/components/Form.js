import React, {useState} from 'react';
import {useSetAtom} from 'jotai';
import {nanoid} from 'nanoid';

import {tasksAtom} from '../tasks';

function Form(props) {
  const setTasks = useSetAtom(tasksAtom);
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name === '') {
      return;
    }
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks((prev) => [...prev, newTask]);
    setName('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
