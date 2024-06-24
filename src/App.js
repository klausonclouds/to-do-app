import React, { useState } from 'react';
import './App.css';
import { Header, Todolist, Footer } from './components';

function App() {
  const [isPopup, setIsPopup] = useState(false);

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
