import React from 'react';
import './App.css';
import { Header, Todolist, Footer } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <Todolist />
      <Footer />
    </div>
  );
}

export default App;
