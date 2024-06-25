// src/components/TodoAdd.tsx
import React, { useState } from 'react';

interface TodoAddProps {
  onAddTodo: (newTodo: { id: string; title: string; isDone: boolean }) => void;
}

const TodoAdd: React.FC<TodoAddProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      const newTodo = { id: Date.now().toString(), title: inputText, isDone: false };
      onAddTodo(newTodo);
      setInputText('');
    }
  };

  return (
    <div className="todo-add">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default TodoAdd;
