import { Todo } from "../model/Todo";
import TodoCheckbox from "./TodoCheckbox";
import TodoIconDelete from "./TodoIconDelete";
import "../styles/TodoItem.css";
import { useState } from "react";


interface TodoItemProps {
  todo: Todo;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckedTodo = () => onClick(todo.id);
  const handleDeleteTodo = () => onDelete(todo.id);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <li className="item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TodoCheckbox todo={todo} onClick={handleCheckedTodo} />
      <span className={`todo-title ${todo.isDone ? 'completed' : ''}`}>
        {todo.title}
      </span>
      {isHovered && <TodoIconDelete onDelete={handleDeleteTodo} />}
    </li>
  )
}

export default TodoItem;