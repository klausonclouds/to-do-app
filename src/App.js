import React from 'react';
import './App.css';
import { Header, Navbar, Todolist, Footer } from './components'

function App() {
  return (
    <div className="App">
        <Header />
        <Navbar />
        <Todolist />
        <Footer />
    </div>
  );
}

export default App;
