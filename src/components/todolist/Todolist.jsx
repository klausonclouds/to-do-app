import React, { useState, useEffect } from 'react';
import './todolist.css';
import Popup from '../popup/Popup';

const Todolist = ({ isPopup, handlePopup }) => {
  const [storedTodos, setStoreTodos] = useState([]);
  const [selectedTodoObj, setSelectedTodoObj] = useState(null);

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todos'));
    setStoreTodos(todoList);
  }, []);

  //Handle open edit form and pass the selected todo object to Popup component when updating
  const handleUpdateTodo = (index) => {
    handlePopup();
    const selectedTodo = storedTodos[index];
    console.log(selectedTodo);
    console.log(index);
    setSelectedTodoObj(selectedTodo);
  };

  return (
    <div>
      <h4>Todo List</h4>
      {storedTodos ? (
        <ul>
          {storedTodos.map((todo, index) => (
            <div key={index}>
              <li>{todo.title}</li>
              <Popup
                index={index}
                type="update"
                isPopup={isPopup}
                onClick={handlePopup}
                selectedTodoObj={selectedTodoObj}
              />
              <button className="update-btn" onClick={() => handleUpdateTodo(index)}>
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
