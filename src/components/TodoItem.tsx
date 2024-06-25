import TodoCheckbox from "./TodoCheckbox";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    isDone: boolean;
  };
  onToggle: (id: string) => void;
  onCheckboxChange: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onCheckboxChange }) => {
  return (
    <li className={todo.isDone ? 'done' : ''}>
      <TodoCheckbox checked={todo.isDone} onChange={() => onCheckboxChange(todo.id)} />
      <span onClick={() => onToggle(todo.id)}>{todo.title}</span>
    </li>
  )
}

export default TodoItem;