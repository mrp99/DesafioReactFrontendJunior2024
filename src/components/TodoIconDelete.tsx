import React from 'react';
import { IoClose } from 'react-icons/io5';
import "../styles/TodoIconDelete.css";

interface TodoIconDeleteProps {
  onDelete: () => void;
}

const TodoIconDelete: React.FC<TodoIconDeleteProps> = ({ onDelete }) => {

  return (
    <div
      className="todo-icon-delete"
      onClick={onDelete}
    >
      <IoClose className="delete-icon" />
    </div>
  );
};

export default TodoIconDelete;