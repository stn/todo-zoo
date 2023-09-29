import {atom} from 'jotai';
import {splitAtom} from 'jotai/utils';
import {nanoid} from 'nanoid';

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false },
];

export const tasksAtom = atom(DATA)
export const taskAtomsAtom = splitAtom(tasksAtom);

export const addTaskAtom = atom(
  null,
  (get, set, name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    set(tasksAtom, (prev) => [...prev, newTask]);
  }
);

export const deleteTaskAtom = atom(
  null,
  (get, set, id) => {
    const tasks = get(tasksAtom);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    set(tasksAtom, remainingTasks);
  }
);
