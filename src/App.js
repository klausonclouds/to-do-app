import React, { useState, useEffect } from 'react';
import './App.css';
import { Header, Todolist, Footer } from './components';

function App() {
  const [isPopup, setIsPopup] = useState(false);
  // const [data, setData] = useState([]);

  //store an empty array to localstorage during inital render
  // useEffect(() => {
  //   const storedData = localStorage.getItem('todos');
  //   if (storedData) {
  //     setData(JSON.parse(storedData));
  //   }
  // }, []);

  const handlePopup = () => {
    setIsPopup((prevIsPopup) => !prevIsPopup);
  };

  // const handleUpdate = (index, newData) => {
  //   setIsPopup((prevIsPopup) => !prevIsPopup);
  //   const updatedData = [...data];
  //   updatedData[index] = newData;
  //   setData(updatedData);
  //   localStorage.setItem('todos', JSON.stringify(updatedData));
  // };

  return (
    <div className="App">
      <Header isPopup={isPopup} onClick={handlePopup} />
      <Todolist isPopup={isPopup} handlePopup={handlePopup} />
      <Footer />
    </div>
  );
}

export default App;
