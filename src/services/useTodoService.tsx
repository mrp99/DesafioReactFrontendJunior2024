import { useEffect, useState } from 'react';
import { Todo } from '../model/Todo';
import axios from 'axios';


const API_URL = "http://localhost:3001/todos";

const useTodoService = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setLoading(false);
      } catch (error: any) {
        setError('Error fetching todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      if (title.trim() === '') return;
      const newTodo: Todo = {
        id: String(new Date().getTime()),
        title: title,
        isDone: false
      };
      const response = await axios.post(API_URL, newTodo);
      setTodos([...todos, response.data]);
    } catch (error: any) {
      setError("Error fetching todos on method addTodo!");
    }
  }

  const checkTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = { ...todoToUpdate, isDone: !todoToUpdate.isDone };
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
      setTodos(updatedTodos);
    } catch {
      setError('Error updating todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  const markAllAsDone = async () => {
    try {
      const areAllDone = todos.every(todo => todo.isDone);

      const updatedTodos = await Promise.all(
        todos.map(async todo => {
          const updatedTodo = { ...todo, isDone: !areAllDone };
          await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
          return updatedTodo;
        })
      );

      setTodos(updatedTodos);

    } catch (error) {
      setError('Error marking all todos as done');
    }
  };

  return { todos, loading, error, addTodo, checkTodo, deleteTodo, markAllAsDone };
};

export default useTodoService;
