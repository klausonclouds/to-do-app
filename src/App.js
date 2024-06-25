import React, { useState, useEffect } from 'react';
import './App.css';
import { Header, Todolist, Footer } from './components';

function App() {
  const [isPopup, setIsPopup] = useState(false);

  //store an empty array to localstorage during inital render
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify([]));
  }, []);

  const handlePopup = () => {
    setIsPopup((prevIsPopup) => !prevIsPopup);
  };

  return (
    <div className="App">
      <Header isPopup={isPopup} onClick={handlePopup} />
      <Todolist />
      <Footer />
    </div>
  );
}

export default App;
