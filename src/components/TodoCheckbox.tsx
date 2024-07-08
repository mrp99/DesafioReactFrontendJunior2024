import React from 'react';
import { Todo } from '../model/Todo';


interface TodoCheckboxProps {
  todo: Todo;
  checked: boolean;
  onClick: () => void;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ checked, onClick }) => {

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onClick}
      aria-label='none'
    />
  );
};
export default TodoCheckbox;
