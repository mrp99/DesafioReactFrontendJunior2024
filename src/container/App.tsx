import React from 'react';
import TodoList from '../components/TodoList';


const App: React.FC = () => {
  return (
    <main className="App">
      <header>
        <h1>todos</h1>
      </header>
      <section>
        <TodoList />
      </section>
    </main>
  );
};

export default App;
