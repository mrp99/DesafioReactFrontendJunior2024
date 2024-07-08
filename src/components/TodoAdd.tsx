import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';
import "../styles/TodoAdd.css";
import useTodoService from '../services/useTodoService';


interface TodoAddProps {
  onSelectAll: () => void;
}

const TodoAdd: React.FC<TodoAddProps> = ({ onSelectAll }) => {
  const { addTodo } = useTodoService();
  const [newTodoTitle, setNewTodoTitle] = useState('');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTodoTitle.trim() !== '') {
      await addTodo(newTodoTitle.trim());
      setNewTodoTitle('');
    }
  };


  return (
    <div className="todo-add">
      <RiArrowDropDownLine className='add-icon' onClick={onSelectAll} />
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
