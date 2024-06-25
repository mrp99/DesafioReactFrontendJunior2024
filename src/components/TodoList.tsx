import React, { useEffect, useState } from 'react';
import { Todo } from '../model/Todo';
import TodoAdd from './TodoAdd';
import TodoItem from './TodoItem';
import { RiArrowDropDownLine } from 'react-icons/ri';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        const sortedTodos = data.todos.sort((a: Todo, b: Todo) => b.id.localeCompare(a.id));
        setTodos(sortedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Todo) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = { ...todoToUpdate, isDone: !todoToUpdate.isDone };
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, isDone: updatedTodo.isDone } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const selectAllTodos = async () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      isDone: newSelectAll,
    }));
    setTodos(updatedTodos);

    try {
      const response = await fetch('http://localhost:3001/todos/select-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedIds: todos.map(todo => todo.id) }),
      });

      if (!response.ok) {
        throw new Error('Failed to select all todos');
      }
    } catch (error) {
      console.error('Error selecting all todos:', error);
    }
  };

  const handleCheckboxChange = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <section className="todo-list">
      <div className="select-all" onClick={selectAllTodos}>
        <RiArrowDropDownLine />
      </div>
      <TodoAdd onAddTodo={addTodo} />
      <ul className="list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
