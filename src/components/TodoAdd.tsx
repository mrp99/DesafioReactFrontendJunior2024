import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';
import "../styles/TodoAdd.css";


interface TodoAddProps {
  markAllAsDone: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
}

const TodoAdd: React.FC<TodoAddProps> = ({ markAllAsDone, addTodo }) => {
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

  const handleSelectAll = async () => await markAllAsDone();



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
