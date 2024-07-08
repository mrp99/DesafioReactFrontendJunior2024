import React from 'react';
import { Todo } from '../model/Todo';


interface TodoCheckboxProps {
  todo: Todo;
  onClick: (id: string) => void;
}

const TodoCheckbox: React.FC<TodoCheckboxProps> = ({ todo, onClick }) => {
  const handleClick = () => onClick(todo.id);

  return (
    <input
      type="checkbox"
      className='checkbox'
      checked={todo.isDone}
      onChange={() => { }}//testando dessa forma!!
      onClick={handleClick}
      aria-label='none'
    />
  );
};
export default TodoCheckbox;
