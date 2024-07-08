import { RiArrowDropDownLine } from 'react-icons/ri';
import useTodoService from '../services/useTodoService';
import { useState } from 'react';
import "../styles/TodoAdd.css";

const TodoAdd: React.FC = () => {
  const { addTodo, todos } = useTodoService();
  const [newTodoTitle, setNewTodoTitle] = useState('');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTodoTitle.trim() !== '') {
      addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };

  const handleSelectAll = () => {
    todos.forEach(todo => {
      console.log(`Selecionando checkbox para a tarefa: ${todo.id}`);
    });
  };


  return (
    <div className="todo-add">
      <RiArrowDropDownLine className='add-icon' onClick={handleSelectAll} />
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default TodoAdd;
