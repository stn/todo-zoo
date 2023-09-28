import {atom} from 'jotai';
import {splitAtom} from 'jotai/utils';

const DATA = [
  { id: 'todo-0', name: 'Eat', completed: true },
  { id: 'todo-1', name: 'Sleep', completed: false },
  { id: 'todo-2', name: 'Repeat', completed: false },
];

export const tasksAtom = atom(DATA)
export const taskAtomsAtom = splitAtom(tasksAtom);
