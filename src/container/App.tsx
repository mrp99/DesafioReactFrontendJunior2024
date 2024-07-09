import React from 'react';
import TodoList from '../components/TodoList';
import Header from '../components/TodoHeader';
import Footer from '../components/TodoFooter';


const App: React.FC = () => {
  return (
    <main className="App">
      <Header />
      <TodoList />
      <Footer />
    </main>
  );
};

export default App;
