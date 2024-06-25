import React, { useState, useEffect } from 'react';
import './todolist.css';
import Popup from '../popup/Popup';

const Todolist = () => {
  const [updatePopup, setUpdatePopup] = useState(false);
  const [storedTodos, setStoreTodos] = useState([]);
  const [selectedTodoObj, setSelectedTodoObj] = useState(null);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todos'));
    setStoreTodos(todoList);
  }, []);

  //Handle open edit form and pass the selected todo object to Popup component when updating
  const handleUpdatePopup = (id) => {
    setUpdatePopup((prevUpdatePopup) => !prevUpdatePopup);
    const selectedTodo = storedTodos.find((todo) => todo.id === id);
    setSelectedTodoObj(selectedTodo);
  };

  // const handleUpdateIndex = (index) => {
  //   setUpdatePopup((prevUpdatePopup) => !prevUpdatePopup);
  //   const selectedTodo
  // };

  return (
    <div>
      <h4>Todo List</h4>
      {storedTodos ? (
        <ul>
          {storedTodos.map((todo, index) => (
            <div key={index}>
              <li>{todo.title}</li>
              <Popup
                key={todo.id}
                type="update"
                onClick={handleUpdatePopup}
                isPopup={updatePopup}
                selectedTodoObj={selectedTodoObj}
              />
              <button className="update-btn" onClick={() => handleUpdatePopup(todo.id)}>
                Update
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <h1>No todos</h1>
      )}
    </div>
  );
};

export default Todolist;
