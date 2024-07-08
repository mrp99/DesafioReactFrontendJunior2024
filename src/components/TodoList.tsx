import React, { useState } from 'react';
import TodoItem from './TodoItem';
import useTodoService from '../services/useTodoService';
import TodoAdd from './TodoAdd';


const TodoList: React.FC = () => {
  const { todos, loading, error, checkTodo, deleteTodo } = useTodoService();
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    todos.forEach(todo => {
      if (todo.isDone !== !selectAll) checkTodo(todo.id);
    });
  };

  const handleCheckedTodo = (id: string) => checkTodo(id);
  const handleDeleteTodo = (id: string) => deleteTodo(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="todo-list">
      <ul className="list">
        <TodoAdd onSelectAll={handleSelectAll} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClick={handleCheckedTodo}
            onDelete={() => handleDeleteTodo(todo.id)}

          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
